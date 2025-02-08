"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { settingsSchema, transactionSchema } from "./validation";
import { redirect } from "next/navigation";

export async function createTransaction(formData) {
  const { success, data } = transactionSchema.safeParse(formData);
  if (!success) {
    throw new Error("Invalid transaction data");
  }
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert(data);

  if (error) {
    throw new Error("Failed creating transaction");
  }
  revalidatePath("/dashboard");
}

export async function updateTransaction(id, formData) {
  const { success, data } = transactionSchema.safeParse(formData);
  if (!success) {
    throw new Error("Invalid transaction data");
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update transaction");
  }
  revalidatePath("/dashboard");
}

export async function fetchTransactions(range, offset = 0, limit = 10) {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("Can't fetch transactions");
  return data;
}

export async function deleteTransaction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete transaction");
  }
  revalidatePath("/dashboard");
}

export async function getTransaction(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function fetchTrend(type, range) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
    range_arg: range,
  });
  return { data, error };
}

export async function Login(prevState, formData) {
  const email = formData.get("email");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return { message: "Error authenticating!", error: true };
  }
  return { message: `Email sent to ${email}` };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/login");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function uploadAvatar(initialState, formData) {
  const file = formData.get("file");
  if (!file.size) {
    return {
      error: true,
      message: "No file uploaded",
    };
  }
  const user = await getUser();
  const avatar = user.user_metadata.avatar.avatar;

  const supabase = await createClient();
  if (avatar) {
    const { error: deleteError } = await supabase.storage
      .from("avatar")
      .remove([avatar]);
    if (deleteError) {
      return {
        error: true,
        message: deleteError.message,
      };
    }
  }
  const fileName = `${user.id}.${file.name.split(".").pop()}`;

  const { error } = await supabase.storage
    .from("avatar")
    .upload(fileName, file, {
      upsert: true,
    });
  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: { avatar: fileName },
  });
  if (dataUpdateError) {
    return {
      error: true,
      message: dataUpdateError.message,
    };
  }
  return {
    message: "Avatar uploaded successfully!",
  };
}

export async function updateSettings(initialState, formData) {
  const formValues = {
    fullName: formData.get("fullName"),
    defaultView: formData.get("defaultView"),
  };
  const validated = settingsSchema.safeParse(formValues);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      data: formValues,
    };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.fullName,
      defaultView: validated.data.defaultView,
    },
  });
  if (error) {
    return {
      error: true,
      message: error.message,
      errors: {},
      data: formValues,
    };
  }
  return {
    error: false,
    message: "Settings updated successfully!",
    errors: {},
    data: validated.data,
  };
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { transactionSchema } from "./validation";

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

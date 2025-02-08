"use client";

import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/lib/actions";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import { useActionState } from "react";

const initialState = {
  message: "",
  error: false,
};

export default function AvatarPage() {
  const [state, formAction] = useActionState(uploadAvatar, initialState);

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={formAction}>
        {state?.error && <AlertError message={state?.message} />}
        {!state?.error && (
          <AlertSuccess message="Avatar uploaded successfully!" />
        )}
        <Input type="file" name="file" id="file" accept="image/*" />
        <SubmitButton type="submit">Upload Avatar</SubmitButton>
      </form>
    </>
  );
}

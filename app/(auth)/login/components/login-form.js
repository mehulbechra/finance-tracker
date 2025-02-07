"use client";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { Login } from "@/lib/actions";
import { useActionState } from "react";

const initialState = {
  message: "",
  error: false,
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(Login, initialState);
  return (
    <form action={formAction} className="space-y-2">
      <Input name="email" type="email" placeholder="name@example.com" />
      <SubmitButton
        type="submit"
        size="sm"
        className="w-full"
        disabled={pending}
      >
        Sign in with email
      </SubmitButton>
      <p
        className={`${
          state?.error ? "text-red-500" : "text-green-500"
        } text-sm text-center`}
      >
        {state?.message}
      </p>
    </form>
  );
}

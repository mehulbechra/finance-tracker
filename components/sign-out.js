"use client";
import { LogOut } from "lucide-react";
import SubmitButton from "./submit-button";
import { useActionState } from "react";
import { signOut } from "@/lib/actions";
export default function SignOutButton() {
  const [, action, pending] = useActionState(signOut, null);
  return (
    <form action={action}>
      <SubmitButton variant="ghost" size="sm" disabled={pending}>
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
}

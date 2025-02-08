"use client";

import Input from "@/components/input";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";
import { updateSettings } from "@/lib/actions";
import Label from "@/components/label";
import DateRangeSelect from "@/components/date-range-select";

const initialState = {
  message: "",
  error: false,
};

export default function SettingsForm({ defaults }) {
  const [state, formAction] = useActionState(updateSettings, initialState);
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError message={state?.message} />}
      {!state?.error && (
        <AlertSuccess message="Settings uploaded successfully!" />
      )}

      <Label htmlFor="fullName">Full Name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="John Doe"
        defaultValue={defaults?.fullName}
      />

      <Label htmlFor="defaultView">Default transaction view</Label>
      <DateRangeSelect
        name="defaultView"
        id="defaultView"
        defaultValue={defaults?.defaultView}
      />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}

"use client";

import Input from "@/components/input";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";
import { updateSettings } from "@/lib/actions";
import Label from "@/components/label";
import DateRangeSelect from "@/components/date-range-select";
import FormError from "@/components/form-error";

const initialState = {
  message: "",
  error: false,
  errors: {},
};

export default function SettingsForm({ defaults }) {
  const [state, formAction] = useActionState(updateSettings, initialState);
  console.log(state);
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertError message={state?.message} />}
      {!state?.error && state?.message && (
        <AlertSuccess message="Settings uploaded successfully!" />
      )}

      <Label htmlFor="fullName">Full Name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="John Doe"
        defaultValue={state?.data?.fullName ?? defaults?.fullName}
      />
      {state?.errors["fullName"]?.map((error) => (
        <FormError key={`fullName-${error}`} error={error} />
      ))}

      <Label htmlFor="defaultView">Default transaction view</Label>
      <DateRangeSelect
        name="defaultView"
        id="defaultView"
        defaultValue={defaults?.defaultView}
      />
      {state?.errors["defaultView"]?.map((error) => (
        <FormError key={`defaultView-${error}`} error={error} />
      ))}

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}

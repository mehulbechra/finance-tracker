"use client";

import { useState } from "react";
import Alert from "@/components/alert";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/lib/actions";
import { Ban, Check } from "lucide-react";

export default function AvatarPage() {
  const [status, setStatus] = useState({ success: false, error: null });

  async function handleSubmit(formData) {
    try {
      await uploadAvatar(formData);
      setStatus({ success: true, error: null });
    } catch (error) {
      setStatus({ success: false, error: error.message });
    }
  }

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={handleSubmit}>
        {status.error && (
          <Alert
            icon={<Ban className="w-6 h-6 text-red-700 dark:text-red-300" />}
            title={
              <span className="text-red-700 dark:text-red-300">Error</span>
            }
          >
            <span className="text-red-700 dark:text-red-300">
              {status.error}
            </span>
          </Alert>
        )}
        {status.success && (
          <Alert
            icon={
              <Check className="w-6 h-6 text-green-700 dark:text-green-300" />
            }
            title={
              <span className="text-green-700 dark:text-green-300">
                Success
              </span>
            }
          >
            <span className="text-green-700 dark:text-green-300">
              Avatar uploaded successfully!
            </span>
          </Alert>
        )}
        <Input type="file" name="file" id="file" accept="image/*" />
        <SubmitButton type="submit">Upload Avatar</SubmitButton>
      </form>
    </>
  );
}

import { getUser } from "@/lib/actions";
import SettingsForm from "./components/settings-form";

export default async function SettingsPage() {
  const { user_metadata } = await getUser();
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
      <SettingsForm defaults={user_metadata} />
    </>
  );
}

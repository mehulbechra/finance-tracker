import { getUserWithSession } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width = 32, height = 32 }) {
  const user = await getUserWithSession();

  const supabase = await createClient();
  const { data: imageData, error } = await supabase.storage
    .from("avatar")
    .createSignedUrl(user.user_metadata?.avatar, 60);

  if (error) {
    return <CircleUser className="w-6 h-6" />;
  }

  return (
    <Image
      src={imageData.signedUrl}
      alt="Avatar"
      width={width}
      height={height}
      className="rounded-full"
    />
  );
}

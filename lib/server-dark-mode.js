import { cookies } from "next/headers";

export default async function ServerDarkMode(defaultTheme = "dark") {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value ?? defaultTheme;
}

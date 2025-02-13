import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServerDarkMode from "@/lib/server-dark-mode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Finance App",
    default: "Finance App",
  },
};

export default async function RootLayout({ children }) {
  const theme = await ServerDarkMode();
  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col px-8`}
      >
        {children}
      </body>
    </html>
  );
}

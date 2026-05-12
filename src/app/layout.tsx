import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mateus Alves Portfolio",
  description:
    "Editorial-cinematic portfolio for video editing and creative direction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={cn("app-body")}>{children}</body>
    </html>
  );
}

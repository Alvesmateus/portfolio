import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}

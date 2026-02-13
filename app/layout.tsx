import type { Metadata } from "next";
import "./globals.css";
import { playfair } from "./fonts";

export const metadata: Metadata = {
  title: "Элина и Евгений",
  description: "Свадебное приглашение",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${playfair.className} bg-white flex justify-center min-h-screen text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}

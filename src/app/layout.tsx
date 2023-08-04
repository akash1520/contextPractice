import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentea",
  description: "Level up your career with Mentea - one sip at a time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

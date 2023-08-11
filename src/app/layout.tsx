import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Raleway, League_Gothic } from "next/font/google";

export const metadata: Metadata = {
  title: "Mentea",
  description: "Level up your career with Mentea - one sip at a time",
};

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const league_gothic = League_Gothic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-gothic",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.variable} ${league_gothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}

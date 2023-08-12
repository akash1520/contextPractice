import { Metadata } from "next";
import Link from "next/link";
import React from "react";

// auth page metadata for mentea
export const metadata: Metadata = {
  title: "Sign up | Mentea",
  description: "Sign up to Mentea to unlock your full potential",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-screen h-screen flex items-center relative font-sans">
      <div className="absolute top-[26px] left-5 z-50">
        <Link href="/">
          <span className="text-[#feec01] font-extrabold text-2xl">Mentea</span>
        </Link>
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;

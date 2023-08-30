import { Metadata } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

// auth page metadata for mentea
export const metadata: Metadata = {
  title: "Privacy Policy | Mentea",
  description: "Privacy Policy of Mentea.",
};

const PayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-[#feec01] flex items-center relative font-sans">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PayLayout;

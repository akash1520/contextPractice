"use client";

import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "@/store/AuthStore";
import NavbarMenu from "./NavbarMenu";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, getCurrentUser, isLoading] = useAuthStore((state) => [
    state.user,
    state.getCurrentUser,
    state.isLoading,
  ]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <nav className="bg-[#feec01] h-[78px]">
      <div className="max-w-7xl p-5 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[#191817] font-extrabold text-2xl">
              Mentea
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center text[#191817] font-medium text-sm">
            <Link href="/">HOME</Link>
            <Link href="/mentors">MENTOR</Link>
            <Link href="/mentorsOnboarding">CONTACT</Link>
            {user ? (
              <NavbarMenu />
            ) : (
              <>
                <Link href="/login">SIGNIN</Link>
                <Link
                  href="/signup"
                  className={`flex items-center gap-2 px-8 py-1.5 text-black font-bold border-2 border-b-4 border-black bg-white transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none ${
                    isLoading ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  Signup
                  {/* show loader while auth status is being fetched */}
                  {isLoading && (
                    <CircularProgress size={16} style={{ color: "#191817" }} />
                  )}
                </Link>
              </>
            )}
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            {isMobileMenuOpen ? (
              <CloseIcon
                onClick={handleMobileMenuToggle}
                className="cursor-pointer"
              />
            ) : (
              <MenuIcon
                onClick={handleMobileMenuToggle}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <Link href="/" className="block text-[#333333] py-2">
              Home
            </Link>
            <Link href="/mentors" className="block text-[#333333] py-2">
              Mentor
            </Link>
            <Link href="/contact" className="block text-[#333333] py-2">
              Contact
            </Link>
            <Link href="/login" className="block text-[#333333] py-2">
              Signin
            </Link>
            <Link href="/signup" className="block text-[#333333] py-2">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthStore } from "@/store/AuthStore";
import NavbarMenu from "./NavbarMenu";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, getCurrentUser, isLoading, userData, getCurrentUserData] = useAuthStore((state) => [
    state.user,
    state.getCurrentUser,
    state.isLoading,
    state.userData,
    state.getCurrentUserData,
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

    if (!user || !userData) {
      fetchUser();
    }
  }, [user]);

  return (
    <nav className="bg-[#feec01] h-[78px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-5">
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
                  className={`btn px-8 py-1.5 bg-white  ${
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
          <MobileNavbar handleMobileMenuToggle={handleMobileMenuToggle} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

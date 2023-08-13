"use client";

import React, { useState } from "react";
import { Menu, Close } from "@mui/icons-material";
import { useAuthStore } from "@/store/AuthStore";

type NavbarProps = {
  onboarding?: boolean;
};

const Navbar = ({onboarding=true}:NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user] = useAuthStore((state) => [state.user]);
  console.log(user);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
            <a href="/" className="">
              HOME
            </a>
            <a href="/mentors" className="">
              MENTOR
            </a>
            <a  href="/mentorsOnboarding" className="">
              CONTACT
            </a>
            {onboarding ? <><a href="/login" className="">
              SIGNIN
            </a>
            <a href="/signup" className="px-8 py-1.5 text-black font-bold border-2 border-b-4 border-black bg-white transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none">
              Signup
            </a></>:null}
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            {isMobileMenuOpen ? (
              <Close
                onClick={handleMobileMenuToggle}
                className="cursor-pointer"
              />
            ) : (
              <Menu
                onClick={handleMobileMenuToggle}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <a href="/" className="block text-[#333333] py-2">
              Home
            </a>
            <a href="/mentors" className="block text-[#333333] py-2">
              Mentor
            </a>
            <a href="/contact" className="block text-[#333333] py-2">
              Contact
            </a>
            <a href="/login" className="block text-[#333333] py-2">
              Signin
            </a>
            <a href="/signup" className="block text-[#333333] py-2">
              Signup
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";

interface MobileNavbarMenuItemProps {
  link: string;
  title: string;
  variant: string;
}

const MobileNavbarMenuItem = ({
  link,
  title,
  variant,
}: MobileNavbarMenuItemProps) => {
  return (
    <Link
      href={link}
      className={`hover:font-semibold text-[18px] cursor-pointer px-6 py-2 text-black font-bold border-2 border-b-4 border-black transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none ${
        variant == "secondary" ? "bg-white" : ""
      }`}
    >
      {title}
    </Link>
  );
};

export default MobileNavbarMenuItem;

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
      className={`btn hover:font-semibold text-[18px] cursor-pointer ${
        variant == "secondary" ? "bg-white" : ""
      }`}
    >
      {title}
    </Link>
  );
};

export default MobileNavbarMenuItem;

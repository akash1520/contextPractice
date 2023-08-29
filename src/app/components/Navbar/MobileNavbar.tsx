import { useAuthStore } from "@/store/AuthStore";
import React from "react";
import { getAvatarInitials } from "./utils";
import MobileNavbarMenuItem from "./MobileNavbarMenuItem";
import { mobileNavbarMenuItems } from "./constants/mobileNavbarMenuItems";

interface MobileNavbarProps {
  handleMobileMenuToggle: () => void;
}

const MobileNavbar = ({ handleMobileMenuToggle }: MobileNavbarProps) => {
  const [user, userData] = useAuthStore((state) => [
    state.user,
    state.userData,
  ]);

  return (
    <>
      <div
        className="fixed bg-[#000] opacity-60 top-0 right-0 left-0 bottom-0 w-full z-20"
        onClick={handleMobileMenuToggle}
      />
      <div className="flex flex-col fixed top-0 transition ease-in-out h-[100vh] duration-3000 bg-[#feec01] text-[#191817] z-50 w-[65%] p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center ">
            <span className="text-[#191817] font-extrabold text-2xl">
              Mentea
            </span>
          </div>
          {user && (
            <div className="flex gap-2">
              <div className="p-1.5 text-black font-bold border-2 border-black bg-white transition-transform duration-200 transform shadow-md rounded-full">
                <span>
                  {getAvatarInitials(
                    userData?.firstName || "",
                    userData?.lastName || ""
                  )}
                </span>
              </div>

              <span className="font-semibold text-lg">
                {userData?.firstName} {userData?.lastName}
              </span>
            </div>
          )}
          {mobileNavbarMenuItems.map((item) => (
            <MobileNavbarMenuItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;

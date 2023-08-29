"use client";

import React, { useState } from "react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useAuthStore } from "@/store/AuthStore";
import { getAvatarInitials } from "./utils";

const NavbarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userData, logout] = useAuthStore((state) => [
    state.userData,
    state.logout,
  ]);

  const handleLogout = () => {
    logout();

    // close the menu
    handleClose();
  };

  return (
    <>
      {userData && (
        <button
          className="ml-2 p-1.5 text-black font-bold border-2 border-b-4 border-black bg-white transition-transform duration-200 transform active:translate-y-[1px] active:border-b-1 shadow-md rounded-full outline-none focus:outline-none"
          onClick={handleClick}
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {getAvatarInitials(
            userData?.firstName || "",
            userData?.lastName || ""
          )}
        </button>
      )}
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="mt-2"
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarMenu;

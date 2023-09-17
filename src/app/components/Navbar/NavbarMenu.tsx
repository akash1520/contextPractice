"use client";

import React, { useState } from "react";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useAuthStore } from "@/store/AuthStore";
import { getAvatarInitials } from "./utils";
import Link from "next/link";

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
          className="btn ml-2 p-1.5 bg-white"
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
        <Link
          href={
            userData?.role === "user"
              ? `/u/${userData?.username}`
              : `/mentor/${userData?.username}`
          }
        >
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarMenu;

"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/Authform/AuthForm";

enum provider {
  Google,
  Twitter,
}

// TODO remove, this demo shouldn't need to reset the theme.
const LoginPage = () => {
  const router = useRouter();
  const [isLoggedIn, user] = useAuthStore((state) => [state.login, state.user]);

  console.log(user)

  const login = async (provider: provider) => {
    if (await isLoggedIn(provider)) {
      router.push("/");
    } else {
      router.refresh();
    }
  };

  return (
    <>
    <Navbar onboarding={false} />
    <AuthForm/>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className="flex justify-center mt-2">
        <Button className="flex" onClick={() => login(provider.Google)}>
          <GoogleIcon className="mx-1" />
        </Button>
        <Button className="flex" onClick={() => login(provider.Twitter)}>
          <TwitterIcon className="mx-1" />
        </Button>
      </Box>
    </Container>
    </>
  );
};
export default LoginPage;

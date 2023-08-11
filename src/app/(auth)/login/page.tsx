"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import Container from "@mui/material/Container";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/Authform/AuthForm";
import Image from "next/image";

enum provider {
  Google,
  Twitter,
}

const LoginPage = () => {
  const router = useRouter();
  const [isLoggedIn, user] = useAuthStore((state) => [state.login, state.user]);

  const login = async (provider: provider) => {
    if (await isLoggedIn(provider)) {
      router.push("/");
    } else {
      router.refresh();
    }
  };

  return (
    <>
      <div className="left md:w-7/12 w-full relative pt-20 h-full flex flex-col items-center justify-center bg-[#191817]">
        <div className="md:w-[440px] w-11/12">
          <h1 className="text-5xl text-center mb-2 font-semibold font-gothic tracking-wide text-[#feec01]">
            Welcome Back!
          </h1>
          <p className="text-base text-center text-[#fefffe]">
            Login to your account to continue upscaling your career with Mentea
          </p>
          <AuthForm />
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
        </div>
      </div>
      <div className="right md:block hidden w-5/12 h-full">
        <Image
          src={"https://picsum.photos/400/600?random=5&grayscale&blur=2"}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full shadow-2xl opacity-50 h-full object-cover"
          alt="sidebar image"
        />
      </div>
    </>
  );
};
export default LoginPage;

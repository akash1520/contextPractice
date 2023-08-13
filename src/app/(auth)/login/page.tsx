"use client";

import React, { Suspense } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import AuthForm from "@/app/(auth)/components/AuthForm";
import AuthImage from "../components/AuthImage";
import AuthFormLoader from "../components/AuthFormLoader";

enum provider {
  Google,
  Twitter,
}

const LoginPage = () => {
  const router = useRouter();
  const [isLoggedIn] = useAuthStore((state) => [state.login]);

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
          <p className="text-sm text-center text-[#fefffe] font-raleway mb-12">
            Login to your account to continue upscaling your career with Mentea
          </p>
          <Suspense
            fallback={
              <>
                <AuthFormLoader />
              </>
            }
          >
            <AuthForm isSignUp={false} />
          </Suspense>
          <div className="flex mt-2 gap-3 text-[#fefffe]">
            <button
              className="flex flex-1 items-center px-3 py-2.5 border-2 border-[#1f1f1f] rounded-lg focus:outline-none gap-2"
              onClick={() => login(provider.Google)}
            >
              <GoogleIcon className="mx-1 text-[#db4437]" />
              <span className="text-sm">Login with Google</span>
            </button>
            <button
              className="flex flex-1 items-center px-3 py-2.5 border-2 border-[#1f1f1f] rounded-lg focus:outline-none gap-2"
              onClick={() => login(provider.Twitter)}
            >
              <TwitterIcon className="mx-1 text-[#1da1f2]" />
              <span className="text-sm">Login with Twitter</span>
            </button>
          </div>
        </div>
      </div>
      <div className="right md:block hidden w-5/12 h-full">
        <AuthImage />
      </div>
    </>
  );
};
export default LoginPage;

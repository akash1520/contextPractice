import React, { Suspense } from "react";
import Image from "next/image";
const AuthForm = React.lazy(() => import("@/app/(auth)/components/AuthForm"));

const RegisterPage = () => {
  return (
    <>
      <div className="left md:w-7/12 w-full h-full p-6 flex flex-col items-center justify-center bg-[#191817] relative overflow-hidden overflow-y-auto">
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40 h-[86px] bg-[#191817] md:w-7/12 w-full" />
        <div className="pt-48 md:pt-56 flex flex-col items-center z-20">
          <h1 className="text-5xl text-center mb-2 font-semibold font-gothic tracking-wide text-[#feec01]">
            Create your Mentea account!
          </h1>
          <p className="text-sm text-center text-[#fefffe] font-raleway mb-12">
            Unlock your full potential with Mentea
          </p>

          <Suspense fallback={<div>Loading AuthForm...</div>}>
            <AuthForm isSignUp={true} />
          </Suspense>
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

export default RegisterPage;

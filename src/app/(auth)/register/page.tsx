import React, { Suspense } from "react";
import Image from "next/image";
const AuthForm = React.lazy(() => import("@/components/Authform/AuthForm"));

const RegisterPage = () => {
  return (
    <>
      <div className="left md:w-7/12 w-full h-full p-6 flex flex-col items-center justify-center overflow-y-auto bg-[#191817]">
        <div className="pt-32 flex flex-col items-center">
          <h1 className="text-5xl text-center mb-2 font-semibold font-gothic tracking-wide text-[#feec01]">
            Create your Mentea account!
          </h1>
          <p className="text-base text-center text-[#fefffe]">
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

import React, { Suspense } from "react";
import AuthImage from "../components/AuthImage";
import AuthFormLoader from "../components/AuthFormLoader";
const AuthForm = React.lazy(() => import("@/app/(auth)/components/AuthForm"));

const SignupPage = () => {
  return (
    <>
      <div className="left md:w-7/12 w-full h-full p-6 flex flex-col items-center justify-center bg-[#191817] relative overflow-hidden overflow-y-auto">
        <div className="fixed top-0 left-0 right-0 bottom-0 z-40 h-[86px] bg-[#191817] md:w-7/12 w-full" />
        <div className="pt-72 flex flex-col items-center z-20 md:w-[430px] w-11/12">
          <h1 className="text-5xl text-center mt-4 pb-1 font-semibold font-gothic tracking-wide text-[#feec01]">
            Create your Mentea account!
          </h1>
          <p className="text-sm text-center text-[#fefffe] font-raleway mb-12">
            Unlock your full potential with Mentea
          </p>

          <Suspense fallback={<><AuthFormLoader /></>}>
            <AuthForm isSignUp={true} />
          </Suspense>
        </div>
      </div>
      <div className="right md:block hidden w-5/12 h-full">
        <AuthImage />
      </div>
    </>
  );
};

export default SignupPage;

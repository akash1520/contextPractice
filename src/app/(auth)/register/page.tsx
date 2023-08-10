import React, { Suspense } from 'react';
import Navbar from "@/components/Navbar";
const AuthForm = React.lazy(() => import('@/components/Authform/AuthForm'));

const RegisterPage = () => {
  return (
    <>
      <Navbar onboarding={false}/>
      <Suspense fallback={<div>Loading AuthForm...</div>}>
        <AuthForm isSignUp={true}/>
      </Suspense>
    </>
  );
};

export default RegisterPage;

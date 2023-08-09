import AuthForm from "@/components/Authform/AuthForm";
import Navbar from "@/components/Navbar";
import React from "react";

const RegisterPage = () => {
  return <>
  <Navbar onboarding={false}/>
  <AuthForm/>
  </>
};

export default RegisterPage;

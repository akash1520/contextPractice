"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { CircularProgress } from "@mui/material";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import AuthFormErr from "./AuthFormErr";
import AuthFormLabel from "./AuthFormLabel";
import AuthFormInput from "./AuthFormInput";
import { signInSchema, signUpSchema } from "../constants/schema";
import Link from "next/link";

type AuthFormProps = {
  isSignUp?: boolean;
};

export default function AuthForm({ isSignUp = false }: AuthFormProps) {
  const validationSchema = isSignUp ? signUpSchema : signInSchema;
  const router = useRouter();
  const [signedUp, login, isLoading, checkUsernameAvailability] = useAuthStore(
    (state) => [
      state.signupEP,
      state.loginEP,
      state.isLoading,
      state.checkUsernameAvailability,
    ]
  );
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      age: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isSignUp) {
        const res = await signedUp({ ...values });
        setIsUsernameAvailable(false);
        if (res) router.push("/");
      } else {
        const res = await login({ ...values });
        if (res) router.push("/");
      }
      resetForm();
    },
  });

  const handleUsernameBlur = async () => {
    if (formik.values.username.length < 5) {
      setIsUsernameAvailable(false);
      return;
    }

    try {
      setCheckingUsername(true);

      const username = formik.values.username;
      const isUsernameAvailable = await checkUsernameAvailability(username);

      if (!isUsernameAvailable) {
        formik.setFieldError("username", "Username is not available");
      }

      setIsUsernameAvailable(isUsernameAvailable);
    } catch (err) {
      console.log(err);
    } finally {
      setCheckingUsername(false);
    }
  };

  return (
    <div className="mt-2 text-center">
      <form onSubmit={formik.handleSubmit} noValidate className="mt-1">
        {isSignUp && (
          <div className="flex gap-2 p-0">
            <AuthFormInput
              label="First Name"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              autoComplete="given-name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              errorCondition={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              errorMessage={formik.touched.firstName && formik.errors.firstName}
              required={true}
            />
            <AuthFormInput
              label="Last Name"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              autoComplete="family-name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              errorCondition={
                formik.touched.lastName && Boolean(formik.errors.lastName)
              }
              errorMessage={formik.touched.lastName && formik.errors.lastName}
              required={true}
            />
          </div>
        )}
        <AuthFormInput
          id="email"
          label="Email"
          required={true}
          type="email"
          placeholder="Email"
          autoComplete="username"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          errorCondition={formik.touched.email && Boolean(formik.errors.email)}
          errorMessage={formik.touched.email && formik.errors.email}
        />

        {isSignUp && (
          <AuthFormInput
            label="Username"
            id="username"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            errorCondition={
              formik.errors.username === "Username is not available" ||
              (formik.touched.username && Boolean(formik.errors.username))
            }
            errorMessage={formik.errors.username}
            required={true}
            onBlur={handleUsernameBlur}
            loader={true}
            loading={checkingUsername}
            loadingFeedback={isUsernameAvailable}
          />
        )}

        {isSignUp && (
          <div className="flex p-0 gap-2">
            <div className="flex-1">
              <AuthFormInput
                label="Age"
                id="age"
                name="age"
                placeholder="Age"
                autoComplete="off" // Turn off autocomplete for number inputs
                value={formik.values.age}
                onChange={formik.handleChange}
                errorCondition={
                  formik.touched.age && Boolean(formik.errors.age)
                }
                errorMessage={formik.touched.age && formik.errors.age}
                type="number"
                min="1"
              />
            </div>

            <div className="flex flex-col w-full flex-1">
              <AuthFormLabel htmlFor="gender" label="Gender" />
              <select
                value={formik.values.gender}
                onChange={formik.handleChange}
                className={`px-4 py-2 bg-[#191817] text-[#fefffe] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-[#fefffe] w-full`}
                id="gender"
              >
                <option aria-label="None" value="" />
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <AuthFormErr
                condition={
                  formik.touched.gender && Boolean(formik.errors.gender)
                }
                message={formik.touched.gender && formik.errors.gender}
              />
            </div>
          </div>
        )}

        <AuthFormInput
          label="Password"
          id="password"
          name="password"
          placeholder="Password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          errorCondition={
            formik.touched.password && Boolean(formik.errors.password)
          }
          errorMessage={formik.touched.password && formik.errors.password}
          required={true}
          type="password"
        />
        {isSignUp && (
          <AuthFormInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-type Password"
            autoComplete="new-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            errorMessage={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            required={true}
            type="password"
          />
        )}

        <div className="my-4">
          <button
            className={`btn bg-white w-full justify-center ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} style={{ color: "#191817" }} />
                Loading...
              </>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>
        </div>
        <div className="text-[#fefffe] font-medium underline">
          {isSignUp ? (
            <div>
              <Link href="/login">Already have an account? Sign In</Link>
            </div>
          ) : (
            <div>
              <Link href="/signup">Don&#39;t have an account? Sign Up</Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

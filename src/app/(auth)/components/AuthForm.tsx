"use client";

import React from "react";
import { useFormik } from "formik";
import { Container, Grid, CssBaseline, Link } from "@mui/material";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import AuthFormErr from "./AuthFormErr";
import AuthFormLabel from "./AuthFormLabel";
import AuthFormInput from "./AuthFormInput";
import { signInSchema, signUpSchema } from "../constants/schema";

type AuthFormProps = {
  isSignUp?: boolean;
};

export default function AuthForm({ isSignUp = false }: AuthFormProps) {
  const validationSchema = isSignUp ? signUpSchema : signInSchema;
  const router = useRouter();
  const signedUp = useAuthStore((state) => state.signupEP);
  const login = useAuthStore((state) => state.loginEP);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      age: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isSignUp) signedUp({ ...values });
      else {
        const res = await login({ ...values });
        if (res) router.push("/");
      }
      resetForm();
    },
  });

  return (
    <Container component="main" className="mt-2 text-center" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={formik.handleSubmit} noValidate className="mt-1">
        <>
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
                errorMessage={
                  formik.touched.firstName && formik.errors.firstName
                }
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
          {/* {isSignUp && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              autoComplete="tel"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.mobileNumber &&
                Boolean(formik.errors.mobileNumber)
              }
              helperText={
                formik.touched.mobileNumber && formik.errors.mobileNumber
              }
            />
          )} */}
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
            errorCondition={
              formik.touched.email && Boolean(formik.errors.email)
            }
            errorMessage={formik.touched.email && formik.errors.email}
          />

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
        </>

        <button
          type="submit"
          className="px-6 py-2 text-[#191817] font-bold border-2 border-b-4 border-[#1f1f1f] bg-[#fefffe] transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none mb-4 mt-3 flex items-center gap-2 w-full justify-center"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        <Grid container>
          {isSignUp ? (
            <Grid item xs>
              <Link href="/login" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          ) : (
            <Grid item>
              <Link href="/register" variant="body2">
                Don&#39;t have an account? Sign Up
              </Link>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
}

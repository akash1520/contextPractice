"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Grid,
  CssBaseline,
  TextField,
  Link,
} from "@mui/material";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import AuthFormErr from "../AuthFormErr";
import AuthFormLabel from "../AuthFormLabel";

type AuthFormProps = {
  isSignUp?: boolean;
};

const signInSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password should be of minimum 8 characters length")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});

const signUpSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  mobileNumber: Yup.string().required("Required"),
  age: Yup.number().positive().integer(),
  gender: Yup.string(),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

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
            <Container className="flex gap-2 p-0 justify-evenly">
              <TextField
                margin="normal"
                required
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                className="mb-4 px-4 py-2 bg-[#fefffe] text-black rounded-lg focus:outline-none border border-[#fefffe] focus:border-primary focus:bg-white"
              />
              <TextField
                margin="normal"
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Container>
          )}
          {isSignUp && (
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
          )}
          <AuthFormLabel htmlFor="email" label="Email" required={true} />
          <input
            type="email"
            required
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="username"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`${
              formik.touched.email && Boolean(formik.errors.email)
                ? "mb-2"
                : "mb-6"
            } px-4 py-2 bg-[#191817] text-[#fefffe] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-[#fefffe] w-full`}
          />
          <AuthFormErr
            condition={formik.touched.email && Boolean(formik.errors.email)}
            message={formik.touched.email && formik.errors.email}
          />
          {isSignUp && (
            <Container className="flex p-0 gap-2">
              <TextField
                className="min-w-5"
                margin="normal"
                id="age"
                label="Age"
                name="age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
              <TextField
                className="w-full"
                margin="normal"
                id="gender"
                label="Gender"
                name="gender"
                select
                value={formik.values.gender}
                onChange={formik.handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                <option aria-label="None" value="" />
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </TextField>
            </Container>
          )}

          <AuthFormLabel htmlFor="password" label="Password" required={true} />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`${
              formik.touched.password && Boolean(formik.errors.password)
                ? "mb-2"
                : "mb-6"
            } px-4 py-2 bg-[#191817] text-[#fefffe] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-[#fefffe] w-full`}
          />
          <AuthFormErr
            condition={
              formik.touched.password && Boolean(formik.errors.password)
            }
            message={formik.touched.password && formik.errors.password}
          />
          {isSignUp && (
            <TextField
              margin="normal"
              required
              className="w-full"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password" // auto-complete
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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

import * as Yup from "yup";

const emailValidation = Yup.string()
  .email("Invalid email format")
  .required("Required");

const passwordValidation = Yup.string()
  .required("Required")
  .min(8, "Password should be of minimum 8 characters length")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
  );

const usernameValidation = Yup.string()
  .required("Required")
  .min(5, "Username must be at least 5 characters");

export const signInSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  username: usernameValidation,
  age: Yup.number().positive().integer(),
  gender: Yup.string(),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

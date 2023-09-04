import * as Yup from "yup";

export const mentorSchema = Yup.object({
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  shortHeading: Yup.string().required("Short heading is required"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(['male', 'female', 'other'], 'Invalid gender type'),
  age: Yup.number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  about: Yup.string(), // Optional, so no required() here
  organization: Yup.string().required("Organization is required"),
  role: Yup.string().required("Role is required"),
  experience: Yup.number()
    .positive("Experience must be a positive number")
    .integer("Experience must be a whole number")
    .required("Experience is required"),
    languages: Yup.array().of(Yup.string()),
  socials: Yup.array().of(Yup.string().url("Must be a valid URL"))
    .required("Socials are required"),
});

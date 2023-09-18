"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import MentorFormInput from "./MentorFormInput";
import { mentorSchema } from "../constants/schema";
import SocialsInput from "./SocialsInput";
import * as Yup from "yup";
import MentorFormSelect from "./MentorFormSelect";
import { useMentorStore } from "@/store/MentorStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

interface MentorFormProps {
  onClose?: VoidFunction;
}

export default function MentorForm({ onClose = () => {} }: MentorFormProps) {
  const [socialsError, setSocialsError] = useState<string | null>(null);
  const [userData] = useAuthStore((state) => [state.userData]);
  const [saveData] = useMentorStore((state) => [state.saveData]);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      username: userData?.username || "",
      shortHeading: "",
      gender: "",
      age: "",
      about: "",
      organization: "",
      role: "",
      experience: 0,
      mobile: "",
      languages: [],
      socials: [],
    },
    validationSchema: mentorSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await saveData(values);
        onClose();
        resetForm();
        if (res) router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleSocialsKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      const newSocial = target.value.trim();

      Yup.string()
        .url()
        .validate(newSocial)
        .then(() => {
          formik.setFieldValue("socials", [
            ...formik.values.socials,
            newSocial,
          ]);
          target.value = "";
          setSocialsError(null); // Clear any error messages
          formik.setFieldTouched("socials", true, false); // set the field as touched
          formik.setFieldError("socials", ""); // Clear Formik error
        })
        .catch((err) => {
          setSocialsError(err.message); // Set manual error
          formik.setFieldTouched("socials", true, false); // set the field as touched
          formik.setFieldError("socials", err.message); // Update Formik error
        });
    }
  };

  const handleLanguagesPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      const target = event.target as HTMLInputElement;
      const newLang = target.value.trim();

      if (newLang) {
        // Ensure the new language is not empty
        formik.setFieldValue("languages", [
          ...formik.values.languages,
          newLang,
        ]);
        target.value = "";
      }
    }
  };

  const handleLanguageRemove = (indexToRemove: number): void => {
    formik.setFieldValue(
      "languages",
      formik.values.languages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSocialsRemove = (indexToRemove: number): void => {
    formik.setFieldValue(
      "socials",
      formik.values.socials.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (
      userData &&
      (formik.values.firstName === "" ||
        formik.values.lastName === "" ||
        formik.values.username === "")
    ) {
      formik.setFieldValue("firstName", userData.firstName);
      formik.setFieldValue("lastName", userData.lastName);
      formik.setFieldValue("username", userData.username);
    }
  }, [userData, formik]);

  console.log(userData)

  return (
    <div className="mt-2 text-center">
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="mt-1 max-w-4xl mx-auto border border-gray-300 rounded-lg px-3 py-4"
      >
        <div className="flex gap-2 w-full">
          <MentorFormInput
            label="First Name"
            id="firstname"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.firstName && Boolean(formik.errors.firstName)
            }
            errorMessage={formik.touched.firstName && formik.errors.firstName}
            required={true}
          />
          <MentorFormInput
            label="Last Name"
            id="lastname"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.lastName && Boolean(formik.errors.lastName)
            }
            errorMessage={formik.touched.lastName && formik.errors.lastName}
            required={true}
          />
        </div>
        <MentorFormInput
          label="Username"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          errorCondition={
            formik.touched.username && Boolean(formik.errors.username)
          }
          errorMessage={formik.touched.username && formik.errors.username}
          required={true}
        />
        <MentorFormInput
          label="Short Heading"
          id="shortHeading"
          name="shortHeading"
          value={formik.values.shortHeading}
          onChange={formik.handleChange}
          errorCondition={
            formik.touched.shortHeading && Boolean(formik.errors.shortHeading)
          }
          errorMessage={
            formik.touched.shortHeading && formik.errors.shortHeading
          }
          required={true}
        />
        <div className="flex flex-row gap-2 w-full">
          <MentorFormSelect
            label="Gender"
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.gender && Boolean(formik.errors.gender)
            }
            errorMessage={formik.touched.gender && formik.errors.gender}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
          <MentorFormInput
            label="Age"
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            errorCondition={formik.touched.age && Boolean(formik.errors.age)}
            errorMessage={formik.touched.age && formik.errors.age}
            required={true}
          />
          <MentorFormInput
            label="Mobile Number"
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.mobile && Boolean(formik.errors.mobile)
            }
            errorMessage={formik.touched.mobile && formik.errors.mobile}
          />
        </div>
        <MentorFormInput
          label="About"
          id="about"
          name="about"
          value={formik.values.about}
          onChange={formik.handleChange}
          errorCondition={formik.touched.about && Boolean(formik.errors.about)}
          errorMessage={formik.touched.about && formik.errors.about}
        />
        <div className="flex flex-row gap-2">
          <MentorFormInput
            label="Organization"
            id="organization"
            name="organization"
            value={formik.values.organization}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.organization && Boolean(formik.errors.organization)
            }
            errorMessage={
              formik.touched.organization && formik.errors.organization
            }
            required={true}
          />

          <MentorFormInput
            label="Role"
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            errorCondition={formik.touched.role && Boolean(formik.errors.role)}
            errorMessage={formik.touched.role && formik.errors.role}
            required={true}
          />
        </div>
        <MentorFormInput
          label="Experience"
          id="experience"
          name="experience"
          value={formik.values.experience.toString()}
          onChange={formik.handleChange}
          errorCondition={
            formik.touched.experience && Boolean(formik.errors.experience)
          }
          errorMessage={formik.touched.experience && formik.errors.experience}
          required={true}
        />

        <SocialsInput
          label="Languages"
          id="languages"
          name="languages"
          placeholder="Add a language and press Enter"
          value={formik.values.languages}
          onChange={formik.handleChange}
          handleKeyPress={handleLanguagesPress}
          remove={handleLanguageRemove}
          errorCondition={
            formik.touched.languages && Boolean(formik.errors.languages)
          }
          errorMessage={
            formik.touched.languages && formik.errors.languages
              ? Array.isArray(formik.errors.languages)
                ? formik.errors.languages.join(", ")
                : formik.errors.languages
              : undefined
          }
        />

        <SocialsInput
          label="Socials"
          id="socials"
          onChange={formik.handleChange}
          name="socials"
          placeholder="Add a social link and press Enter"
          value={formik.values.socials}
          handleKeyPress={handleSocialsKeyPress}
          remove={handleSocialsRemove}
          errorCondition={
            formik.touched.socials && Boolean(formik.errors.socials)
          }
          manualError={socialsError}
          errorMessage={
            formik.touched.socials && formik.errors.socials
              ? Array.isArray(formik.errors.socials)
                ? formik.errors.socials.join(", ")
                : formik.errors.socials
              : undefined
          }
        />

        <div className="my-4">
          <button type="submit" className="btn bg-white w-full justify-center">
            Register as Mentor
          </button>
        </div>
      </form>
    </div>
  );
}

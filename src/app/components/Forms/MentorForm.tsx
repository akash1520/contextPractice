import React from "react";
import { useFormik } from "formik";
import MentorFormInput from "./MentorFormInput";
import { mentorSchema } from "./schema";
import SocialsInput from "./SocialsInput";
import * as Yup from "yup";
import MentorFormSelect from "./MentorFormSelect";
import { useMentorStore } from "@/store/MentorStore";
import { useRouter } from "next/navigation";

interface MentorFormProps{
  onClose: VoidFunction
}

export default function MentorForm({onClose}:MentorFormProps) {
  const [socialsError, setSocialsError] = React.useState<string | null>(null);

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: "",
      shortHeading: "",
      gender: "",
      age: "",
      about: "",
      organization: "",
      role: "",
      experience: 0,
      languages: [],
      socials: [],
    },
    validationSchema: mentorSchema,
    onSubmit: async (values, {resetForm}) => {
      try{const res = await useMentorStore.getState().saveData(values);
      await useMentorStore.getState().getMentorData();
      onClose();
      resetForm();
      if(res)router.push("/");}
      catch(err){
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
  
      if (newLang) { // Ensure the new language is not empty
        formik.setFieldValue("languages", [
          ...formik.values.languages,
          newLang,
        ]);
        target.value = "";       
      }
    }
  };
  

  return (
    <div className="mt-2 text-center">
      <form onSubmit={formik.handleSubmit} noValidate className="mt-1">
        <div>
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
          />
        </div>
        <div>
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
          />
        </div>
        <div className="flex flex-row gap-2">
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
          />
        </div>
        <div>
          <MentorFormInput
            label="About"
            id="about"
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            errorCondition={
              formik.touched.about && Boolean(formik.errors.about)
            }
            errorMessage={formik.touched.about && formik.errors.about}
          />
        </div>
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
          />

          <MentorFormInput
            label="Role"
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            errorCondition={formik.touched.role && Boolean(formik.errors.role)}
            errorMessage={formik.touched.role && formik.errors.role}
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
        />

        <SocialsInput
          label="Languages"
          id="languages"
          name="languages"
          value={formik.values.languages}
          onChange={formik.handleChange}
          handleKeyPress={handleLanguagesPress}
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
          value={formik.values.socials}
          handleKeyPress={handleSocialsKeyPress}
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

import React from "react";
import AuthFormLabel from "./MentorFormLabel";
import AuthFormErr from "./MentorFormErr";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface MentorFormInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorCondition: boolean | undefined;
  errorMessage: string | undefined | false;
  required?: boolean;
  className?: string;
  loader?: boolean;
  loading?: boolean;
  loadingFeedback?: boolean;
  [key: string]: any;
}

const AuthFormInput: React.FC<MentorFormInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  errorCondition,
  errorMessage,
  required = false,
  className = "",
  loader = false,
  loading,
  loadingFeedback,
  ...props
}) => {
  return (
    <div className="flex flex-col relative w-full">
      <AuthFormLabel htmlFor={id} label={label} required={required} />
      <input
        required
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${
          errorCondition ? "mb-2" : "mb-6"
        } px-4 py-2 text-[#1f1f1f] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-gray-200 w-full ${className}`}
        {...props}
      />
      {/* loader prop for availabilty of loader and loading is loader condition */}
      {loader && loading && (
        <div className="loader absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
          <CircularProgress size={14} style={{ color: "#fefffe" }} />
        </div>
      )}

      {/* shows feedback after the loading is complete */}
      {!loading && loadingFeedback && (
        <div className="loader absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
          <CheckIcon className="text-green-400 text-[16px]" />
        </div>
      )}
      <AuthFormErr condition={errorCondition} message={errorMessage} />
    </div>
  );
};

export default AuthFormInput;

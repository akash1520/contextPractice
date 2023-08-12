import React from "react";
import AuthFormLabel from "./AuthFormLabel";
import AuthFormErr from "./AuthFormErr";

interface AuthFormInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorCondition: boolean | undefined;
  errorMessage: string | undefined | false;
  required?: boolean;
  className?: string;
  [key: string]: any;
}

const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  errorCondition,
  errorMessage,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <AuthFormLabel htmlFor={id} label={label} required={required} />
      <input
        required
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${
          errorCondition ? "mb-2" : "mb-6"
        } px-4 py-2 bg-[#191817] text-[#fefffe] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-[#fefffe] w-full ${className}`}
        {...props}
      />
      <AuthFormErr condition={errorCondition} message={errorMessage} />
    </div>
  );
};

export default AuthFormInput;

import React from "react";

interface AuthFormLabel {
  htmlFor: string;
  label: string;
  required?: boolean;
}

const AuthFormLabel: React.FC<AuthFormLabel> = ({
  htmlFor,
  label,
  required = false,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-left text-[#fefffe] mb-2"
    >
      {label}
      {required && <span className="text-red-500 text-sm">*</span>}
    </label>
  );
};

export default AuthFormLabel;

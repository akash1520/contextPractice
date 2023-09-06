import React from "react";

interface MentorFormLabel {
  htmlFor: string;
  label: string;
  required?: boolean;
}

const MentorFormLabel: React.FC<MentorFormLabel> = ({
  htmlFor,
  label,
  required = false,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-left text-[black] mb-2"
    >
      {label}
      {required && <span className="text-red-500 text-sm">*</span>}
    </label>
  );
};

export default MentorFormLabel;

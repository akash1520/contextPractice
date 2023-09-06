import React from "react";
import MentorFormLabel from "./MentorFormLabel";
import MentorFormErr from "./MentorFormErr";

interface MentorFormSelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorCondition: boolean | undefined;
  errorMessage: string | undefined | false;
  options: { value: string; label: string }[];
  [key: string]: any;
}

const MentorFormSelect: React.FC<MentorFormSelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  errorCondition,
  errorMessage,
  options,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <MentorFormLabel htmlFor={id} label={label} required={true} />
      <select
      className="bg-black py-2 text-white"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option className="text-white" value="">Select Gender</option>
        {options.map((option) => (
          <option key={option.value} className="text-white" value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MentorFormErr condition={errorCondition} message={errorMessage} />
    </div>
  );
};

export default MentorFormSelect;

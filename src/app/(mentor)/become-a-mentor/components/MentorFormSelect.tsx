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
    <div className="flex flex-col w-full">
      <MentorFormLabel htmlFor={id} label={label} required={true} />
      <select
        className="bg-[#fefffe] px-4 py-2 text-[#1f1f1f] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-gray-200 w-full"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option className="text-[#191817]" value="">
          Select Gender
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-[#191817]"
          >
            {option.label}
          </option>
        ))}
      </select>
      <MentorFormErr condition={errorCondition} message={errorMessage} />
    </div>
  );
};

export default MentorFormSelect;

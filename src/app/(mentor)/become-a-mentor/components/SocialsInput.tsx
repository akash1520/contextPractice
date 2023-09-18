import React from "react";
import MentorFormLabel from "./MentorFormLabel";
import MentorFormErr from "./MentorFormErr";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface SocialsInputProps {
  label: string;
  id: string;
  name: string;
  value: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorCondition: boolean | undefined;
  errorMessage: string | undefined | false;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  loader?: boolean;
  loading?: boolean;
  loadingFeedback?: boolean;
  manualError?: string | null;
  remove: (index: number) => void;
  [key: string]: any;
}

const SocialsInput: React.FC<SocialsInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  errorCondition,
  errorMessage,
  handleKeyPress,
  required = false,
  className = "",
  loader = false,
  loading,
  loadingFeedback,
  manualError,
  remove,
  ...props
}) => {
  return (
    <div className="flex flex-col relative mb-4">
      <MentorFormLabel htmlFor={id} label={label} required={required} />
      <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-3 py-2">
        <input
          required
          id={id}
          name={name}
          onKeyPress={handleKeyPress}
          className={`${
            errorCondition ? "mb-2" : "mb-6"
          } px-4 py-2 bg-[#fefffe] text-[#191817] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-gray-400 w-full ${className}`}
          {...props}
        />
        {value.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg flex items-center px-2 py-1 text-black"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-2 text-red-500 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {loader && loading && (
        <div className="loader absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
          <CircularProgress size={14} style={{ color: "#fefffe" }} />
        </div>
      )}
      {!loading && loadingFeedback && (
        <div className="loader absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
          <CheckIcon className="text-green-400 text-[16px]" />
        </div>
      )}

      {errorCondition && (errorMessage || manualError) && (
        <MentorFormErr
          condition={errorCondition}
          message={manualError || errorMessage}
        />
      )}
    </div>
  );
};

export default SocialsInput;

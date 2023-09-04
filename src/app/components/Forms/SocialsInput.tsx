import React from "react";
import MentorFormLabel from "./MentorFormLabel";
import MentorFormErr from "./MentorFormErr";
import { CircularProgress } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

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
  manualError
}) => {

       

  return (
    <div className="flex flex-col relative">
      <MentorFormLabel htmlFor={id} label={label} required={required} />
      <input
        required
        id={id}
        name={name}
        placeholder="Add a social link and press Enter"
        onKeyPress={handleKeyPress}
        className={`${
          errorCondition ? "mb-2" : "mb-6"
        } px-4 py-2 bg-[#191817] text-[#fefffe] rounded-lg focus:outline-none border-2 border-[#1f1f1f] focus:border-[#fefffe] w-full ${className}`}
      />
      <ul className="list-disc ml-5">
        {value.map((social, index) => (
          <li key={index}>{social}</li>
        ))}
      </ul>
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

      {errorCondition && (errorMessage || manualError) && (<MentorFormErr condition={errorCondition} message={manualError||errorMessage} />)}
    </div>
  );
};

export default SocialsInput;

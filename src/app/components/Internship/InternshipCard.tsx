import Image from "next/image";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface InternshipCardProps {
  imageSrc: string;
  heading: string;
  description: string;
  buttonText: string;
}

const InternshipCard = ({
  imageSrc,
  heading,
  description,
  buttonText,
}: InternshipCardProps) => {
  return (
    <div className="rounded-2xl shadow-md overflow-hidden border-2 border-b-4 border-black max-w-xs min-h-[400px] mx-auto md:mx-0 font-raleway text-[#191817]">
      <div className="h-40 relative">
        <Image src={imageSrc} alt={heading} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col justify-between p-6">
        <div className="">
          <h3 className="text-xl font-semibold mb-2">{heading}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <div className="">
          <button className="px-8 py-2 text-black font-bold border-2 border-b-4 border-black bg-white transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none mb-4 flex items-center gap-2">
            {buttonText} <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;

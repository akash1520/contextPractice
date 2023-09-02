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
    <div className="card flex flex-col">
      <div className="h-40 relative">
        <Image
          src={imageSrc}
          alt={heading}
          fill={true}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">{heading}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        <div>
          <button className="btn">
            {buttonText} <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;

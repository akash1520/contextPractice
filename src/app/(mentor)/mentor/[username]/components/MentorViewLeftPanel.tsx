import MentorSocials from "@/app/(mentor)/mentors/components/MentorSocials";
import CustomIcon from "@/app/components/CustomIcon";
import Image from "next/image";
import React from "react";

const MentorViewLeftPanel = ({
  firstName,
  lastName,
  shortHeading,
  experience,
  socials,
  about,
  languages,
  profileImgUrl,
}: Mentor) => {
  return (
    <div className="md:flex-1">
      <div className="px-4 pb-4 flex flex-col w-full rounded-2xl rounded-t-none shadow-md border-x-2 border-b-4 border-black text-[#191817] mb-6">
        <Image width={300} height={300} alt="mentor profile image" className="w-32 h-32 bg-slate-200 rounded-full border-4 border-white translate-y-[-50%]" src={profileImgUrl} />
        <div className="-mt-12 flex flex-col">
          <span className="text-2xl font-semibold">
            {firstName} {lastName}
          </span>
          <span className="mb-4">{shortHeading}</span>
          <div className="flex flex-row mb-4">
            <span>
              <CustomIcon name="BusinessCenterOutlined" /> {experience} years
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <MentorSocials socials={socials} />
            <button className="btn">Share</button>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col w-full rounded-2xl shadow-md border-2 border-b-4 border-black text-[#191817] mb-6">
        <h3 className="text-xl font-semibold mb-4">About Mentor</h3>
        <p>{about}</p>
      </div>
      <div className="p-4 flex flex-col w-full rounded-2xl shadow-md border-2 border-b-4 border-black text-[#191817]">
        <h3 className="text-xl font-semibold mb-4">Fluent in</h3>
        <div className="flex gap-2 items-center">
          {languages.map((language, index) => (
            <span
              key={index}
              className="px-2 py-1 border-gray-100 rounded-full"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorViewLeftPanel;

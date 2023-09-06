import MentorSocials from "@/app/(landing)/mentors/components/MentorSocials";
import React from "react";

const MentorViewLeftPanel = ({ firstName, lastName, shortHeading, experience, socials }: Mentor) => {
  return (
    <div className="flex-1">
      <div className="px-4 flex flex-col w-full bg-violet-200">
        <div className="w-32 h-32 bg-slate-200 rounded-full border-4 border-white translate-y-[-50%]" />
        <div className="-mt-12 flex flex-col">
          <span className="text-2xl font-semibold">
            {firstName} {lastName}
          </span>
          <span>{shortHeading}</span>
          <div className="flex flex-row">
            <span>{experience} years</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <MentorSocials socials={socials} />
            </div>
            <button className="btn">Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorViewLeftPanel;

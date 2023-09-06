import React from "react";
import MentorSocials from "./MentorSocials";

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  return (
    <div className="card flex flex-col justify-center p-6 items-center w-xs sm:w-auto">
      <div className="relative">
        <div className="bg-gray-500 h-24 w-24 md:h-36 md:w-36 rounded-full"></div>
      </div>
      <div className="flex-1 flex flex-col justify-between w-full text-center mt-2">
        <div>
          <h3 className="text-xl font-semibold">
            {mentor.firstName} {mentor.lastName}
          </h3>
          <p className="text-gray-600 mb-4">{mentor.organization}</p>
          <p className="text-gray-600">{mentor.shortHeading}</p>
        </div>
        <div className="flex justify-between items-center">
          <MentorSocials socials={mentor.socials} />
          <button className="btn px-4 py-1 bg-[#feec01]">Book Session</button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;

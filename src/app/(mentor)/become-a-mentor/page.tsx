import MentorForm from "./components/MentorForm";
import React from "react";

const page = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-5">
      <div className="">
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#191817] text-center mb-16 font-gothic">
          BECOME A <span className="underline">MENTOR</span>
        </h3>
        <div className="max-w-5xl mx-auto">
          <MentorForm />
        </div>
      </div>
    </div>
  );
};

export default page;

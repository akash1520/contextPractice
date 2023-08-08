import React from "react";
import internshipData from "./constants";
import InternshipCard from "./InternshipCard";

const Internship = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-20 px-5">
        <h3 className="text-7xl font-bold text-[#191817] text-center mb-16 tracking-tighter">
          FEATURED <span className="underline">INTERNSHIPS</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {internshipData.map((internship, index) => {
            return (
              <InternshipCard
                key={index}
                imageSrc={internship.imageSrc}
                heading={internship.heading}
                description={internship.description}
                buttonText={internship.buttonText}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Internship;

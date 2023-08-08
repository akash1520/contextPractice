import React from "react";
import { featuresData } from "./constants";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <div className="bg-[#191817]">
      <div className="max-w-7xl mx-auto">
        <div className="py-20 px-5">
          <h3 className="text-7xl font-bold text-[#fefffe] text-center mb-12 tracking-tight">
            Book a <span className="text-[#feec01] underline">meeting</span>{" "}
            with a <span className="text-[#feec01] underline">past intern</span>{" "}
            to receive one-on-one mentoring and enhance your chances of <br />
            <span className="text-[#feec01] underline">
              landing your ideal intern.
            </span>
          </h3>
          <div className="flex flex-wrap">
            {featuresData.map((feature, index) => {
              return (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

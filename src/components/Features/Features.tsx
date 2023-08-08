import React from "react";
import { featuresData } from "./constants";
import FeatureCard from "./FeatureCard";
import FeatureHeading from "./FeatureHeading";

const Features = () => {
  return (
    <div className="bg-[#191817]">
      <div className="max-w-7xl mx-auto">
        <div className="py-20 px-5">
          <FeatureHeading />
          <div className="flex flex-wrap gap-4 md:gap-0">
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

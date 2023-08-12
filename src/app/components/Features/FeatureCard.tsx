import React from "react";
import { Balancer } from "react-wrap-balancer";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.FC;
}

const FeatureCard = (feature: FeatureCardProps) => {
  return (
    <div className="w-full p-4 md:w-1/3 text-[#fefffe] font-raleway">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center justify-center w-[45px] h-[45px] bg-[#feec01] text-[#191817] rounded-lg mb-4">
          <feature.icon />
        </div>
        <h2 className="font-bold text-4xl mb-4 text-center">{feature.title}</h2>
        <p className="font-medium text-lg text-center">
          <Balancer>{feature.description}</Balancer>
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;

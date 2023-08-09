import React from "react";
import { Balancer } from "react-wrap-balancer";

const FeatureHeading = () => {
  return (
    <h3 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#fefffe] text-center mb-16 tracking-wide font-gothic">
      <Balancer>
        <span>BOOK A </span>
        <span className="text-[#feec01] underline">MEETING</span> WITH A{" "}
        <span className="text-[#feec01] underline">PAST INTERN</span> TO RECEIVE
        ONE-ON-ONE MENTORING AND ENHANCE YOUR CHANCES OF <br />
        <span className="text-[#feec01] underline">
          LANDING YOUR IDEAL INTERN.
        </span>
      </Balancer>
    </h3>
  );
};

export default FeatureHeading;

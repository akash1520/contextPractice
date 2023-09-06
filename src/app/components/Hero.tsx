import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";

const Hero = () => {
  return (
    <div className="bg-[#feec01]">
      <div className="max-w-7xl mx-auto md:text-center">
        <div className="py-12 px-5">
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium font-gothic">
              1-ON-1 LIVE
              <br /> MENTORSHIP WITH <br /> MENTEA
            </h1>
            <p className="max-w-4xl font-medium font-raleway md:text-xl mx-auto mt-6">
              <Balancer>
                The mentorship platform for university students seeking a leg-up
                in their careers. Our industry expert mentors are ready to guide
                you through your path to success!
              </Balancer>
            </p>
            <div className="flex flex-wrap gap-8 md:justify-center mt-10">
              <button className="btn md:w-[250px] px-12 py-2 bg-white justify-center">
                Find a Mentor
              </button>
              <Link
                href="/become-a-mentor"
                className="btn md:w-[250px] px-12 py-2 "
              >
                Become a Mentor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

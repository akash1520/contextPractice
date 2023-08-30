import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { Balancer } from "react-wrap-balancer";

const Mentor = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-20 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center max-w-5xl mx-auto">
          {/* left side */}
          <div className="flex flex-col justify-center row-start-2 md:row-start-1">
            <h3 className="text-4xl lg:text-5xl font-medium text-[#191817] text-left mb-8 font-gothic">
              <Balancer>
                BECOME A <span className="underline">MENTOR</span> TO ACCELERATE
                TOMORROW&apos;S TALENT
              </Balancer>
            </h3>
            <p className="text-2xl text-[#191817]">
              <Balancer>
                Empower the next generation of professionals by sharing your
                insights, expertise, and stories from your own career journey.
              </Balancer>
            </p>

            <div className="flex items-center mt-10 gap-4">
              <button className="px-6 py-2 text-black font-bold border-2 border-b-4 border-black bg-[#feec01] transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none mb-4 flex items-center gap-2">
                Apply Now <ArrowForwardIosIcon fontSize="small" />
              </button>
              <button className="px-6 py-2 text-black font-bold border-2 border-b-4 border-black bg-white transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none mb-4 flex items-center gap-2">
                Learn More
              </button>
            </div>
          </div>
          {/* right side */}
          <div className="flex justify-center items-center relative rounded-3xl overflow-hidden min-h-[300px]">
            <Image
              src="/images/gos.png"
              alt="mentor"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;

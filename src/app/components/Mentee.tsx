import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import { Balancer } from "react-wrap-balancer";

const Mentee = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="pt-12 pb-0 md:py-20 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center max-w-5xl mx-auto">
          {/* left side */}
          <div className="flex justify-center items-center relative rounded-3xl overflow-hidden min-h-[300px]">
            <Image
              src="https://picsum.photos/400/600?random=1&grayscale&blur=2"
              alt="mentee"
              fill={true}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          {/* right side */}
          <div className="flex flex-col justify-center">
            <h3 className="text-4xl lg:text-5xl font-medium text-[#191817] text-left mb-8 font-gothic">
              <Balancer>
                <span className="underline">UNLOCK YOUR POTENTIAL</span> WITH
                PERSONALIZED 1-ON-1 MENTORING
              </Balancer>
            </h3>
            <p className="text-2xl text-[#191817]">
              <Balancer>
                Mentea connects you with experienced professionals in your
                field, helping you explore new opportunities and build your
                professional network.
              </Balancer>
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center mt-10 gap-4">
              <button className="px-6 py-2 text-black font-bold border-2 border-b-4 border-black bg-[#feec01] transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 shadow-md rounded-full focus:outline-none mb-4 flex items-center gap-2">
                Find a Mentor <ArrowForwardIosIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentee;

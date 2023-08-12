import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Balancer } from "react-wrap-balancer";

const Testimonials = () => {
  return (
    <div className="bg-[#feec01]">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#191817] text-center mb-16 md:mb-24 font-gothic">
          FEEDBACK FROM <span className="underline">STUDENTS</span>
        </h3>
        <div className="mt-12 border-[3px] border-b-8 border-black p-6 md:p-12 rounded-2xl text-center text-[#191817] max-w-5xl mx-auto relative">
          <p className="font-medium text-2xl lg:text-3xl leading-relaxed">
            <Balancer>
              Working with the team at XYZ Company has been an incredible
              experience. Their dedication, professionalism, and expertise have
              helped our project exceed expectations. The attention to detail
              and commitment to delivering high-quality results truly set them
              apart.
            </Balancer>
          </p>
          <div>
            <h4 className="text-2xl lg:text-3xl font-semibold mt-8">
              John Doe
            </h4>
            <p className="">Student, XYZ University</p>

            <div className="absolute left-0 top-[50%] -translate-y-[50%] -translate-x-[50%]">
              <button className="p-2 md:p-4 text-black font-bold border-[3px] border-black bg-white transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 rounded-full focus:outline-none flex items-center justify-center">
                <ArrowBackIosNewIcon className="w-4 h-4 text-[10px] font-bold" />
              </button>
            </div>

            <div className="absolute right-0 top-[50%] -translate-y-[50%] translate-x-[50%]">
              <button className="p-2 md:p-4 text-black font-bold border-[3px] border-black bg-white transition-transform duration-200 transform hover:translate-y-[-2px] active:translate-y-[1px] active:border-b-1 rounded-full focus:outline-none flex items-center justify-center">
                <ArrowForwardIosIcon className="w-4 h-4 text-[10px] font-bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

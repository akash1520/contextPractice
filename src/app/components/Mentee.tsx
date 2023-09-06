import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Balancer } from "react-wrap-balancer";
import dynamic from "next/dynamic";
import Link from "next/link";

const Mentee = () => {
  const DynamicVideoComponent = dynamic(
    () => import("../components/VideoComponent"),
    { ssr: false } // This will only render the component on client-side
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="pt-12 pb-0 md:py-20 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center max-w-5xl mx-auto">
          {/* left side */}
          <div className="flex justify-center items-center relative rounded-3xl overflow-hidden min-h-[300px]">
            <DynamicVideoComponent />
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

            <div className="flex flex-col md:flex-row items-start md:items-center mt-10 mb-4 gap-4">
              <Link href="/mentors" className="btn bg-[#feec01]">
                Find a Mentor <ArrowForwardIosIcon fontSize="small" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentee;

import React from "react";
import { Balancer } from "react-wrap-balancer";
import CustomIcon from "@/app/components/CustomIcon";

const SessionCard = ({
  title,
  price,
  duration,
}: {
  title: string;
  price: number;
  duration: number;
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl shadow-md p-4 overflow-hidden border-2 border-b-4 border-black mx-auto md:mx-0 text-[#191817]">
      <h4 className="text-xl font-semibold">
        <Balancer>{title}</Balancer>
      </h4>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <CustomIcon name="VideoCall" fontSize="small" /> 1:1 call
          </div>
          <div className="flex items-center gap-1">
            <CustomIcon name="AccessTime" fontSize="small" /> {duration} min
          </div>
        </div>
        <span className="text-xl font-bold">₹ {price}</span>
      </div>
      <button className="btn justify-center">Book Now</button>
    </div>
  );
};

export default SessionCard;

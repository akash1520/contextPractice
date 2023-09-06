import React from "react";
import { Balancer } from "react-wrap-balancer";

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
    <div className="flex flex-col gap-4 rounded-2xl shadow-md bg-gray-200 p-4">
      <h4 className="text-xl font-raleway font-semibold">
        <Balancer>{title}</Balancer>
      </h4>
      <div className="flex justify-between">
        <span>{duration}</span>
        <span className="text-xl font-bold">₹ {price}</span>
      </div>
      <button className="btn justify-center">Book Now</button>
    </div>
  );
};

export default SessionCard;

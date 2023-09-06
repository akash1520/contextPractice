import React from "react";
import SessionCard from "./SessionCard";

const sessionData = [
  {
    title: "[50% OFF] Tech: Resume review",
    price: 100,
    duration: 45,
  },
  {
    title: "[50% OFF] General Q&A",
    price: 100,
    duration: 30,
  },
  {
    title: "[50% OFF] Tech: Excelling as a developer",
    price: 100,
    duration: 30,
  },
];

const MentorViewRightPanel = () => {
  return (
    <div className="w-[30%] mt-8">
      <h3 className="text-3xl font-bold font-gothic tracking-wider">
        Sessions
      </h3>
      <div className="flex flex-col gap-4 mb-2">
        {sessionData.map((session, index) => (
          <SessionCard key={index} {...session} />
        ))}
      </div>
    </div>
  );
};

export default MentorViewRightPanel;

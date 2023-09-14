import React from "react";
import MentorViewRightPanel from "./MentorViewRightPanel";
import MentorViewLeftPanel from "./MentorViewLeftPanel";

type MentorViewProps = {
  mentor: Mentor;
};

const MentorView = ({ mentor }: MentorViewProps) => {
  return (
    <div className="bg-[#fefffe]">
      <div className="w-full h-48 bg-gray-100"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8">
          <MentorViewLeftPanel {...mentor} />
          <MentorViewRightPanel />
        </div>
      </div>
    </div>
  );
};

export default MentorView;

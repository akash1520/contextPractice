import React from "react";
import MentorViewRightPanel from "./MentorViewRightPanel";
import MentorViewLeftPanel from "./MentorViewLeftPanel";

type MentorViewProps = {
  mentor: MentorWithId;
};

const MentorView = ({ mentor }: MentorViewProps) => {
  return (
    <div className="bg-[#fefffe]">
      <div className="w-full h-48 bg-gray-100"></div>
      <div className="max-w-7xl mx-auto">
        <div className="px-5 flex gap-8 flex-wrap">
          <MentorViewLeftPanel {...mentor} />
          <MentorViewRightPanel mentorId={mentor.id} />
        </div>
      </div>
    </div>
  );
};

export default MentorView;

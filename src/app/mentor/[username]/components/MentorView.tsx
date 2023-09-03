import React from "react";

type MentorViewProps = {
  mentor: Mentor;
};

const MentorView = ({ mentor }: MentorViewProps) => {
  return (
    <div>
      <h2>Mentor Profile</h2>

      <ul>
        {Object.keys(mentor).map((key) => (
          <li key={key}>
            {key}: {mentor[key as keyof Mentor]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorView;

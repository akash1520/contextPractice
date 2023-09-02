"use client"

import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const getSocialIcon = (socialUrl: string) => {
  if (socialUrl.includes("twitter")) {
    return <TwitterIcon />;
  } else if (socialUrl.includes("linkedin")) {
    return <LinkedInIcon />;
  }
};

const MentorSocials = ({ socials }: { socials: string[] }) => {
  return (
    <div className="flex gap-1">
      {socials.map((social, index) => (
        <a href={social} key={index}>
          {getSocialIcon(social)}
        </a>
      ))}
    </div>
  );
};

export default MentorSocials;

"use client";

import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from '@mui/icons-material/Link';

const getSocialIcon = (socialUrl: string) => {
  if (socialUrl.includes("twitter")) {
    return <TwitterIcon />;
  } else if (socialUrl.includes("linkedin")) {
    return <LinkedInIcon />;
  } else {
    return <LinkIcon />
  }
};

const MentorSocials = ({ socials }: { socials: string[] }) => {
  return (
    <div className="flex gap-2">
      <span onClick={(e) => e.stopPropagation()}>
        {socials.map((social, index) => (
          <a href={social} key={index}>
            {getSocialIcon(social)}
          </a>
        ))}
      </span>
    </div>
  );
};

export default MentorSocials;

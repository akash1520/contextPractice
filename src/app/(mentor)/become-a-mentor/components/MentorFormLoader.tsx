import { CircularProgress } from "@mui/material";
import React from "react";

const MentorFormLoader = () => {
  return (
    <>
      <CircularProgress size={50} style={{ color: "#fefffe" }} />
      Loading...
    </>
  );
};

export default MentorFormLoader;

import Image from "next/image";
import React from "react";

const AuthImage = () => {
  return (
    <Image
      src={"/images/menteaBG.png"}
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-full object-cover"
      alt="auth image"
    />
  );
};

export default AuthImage;

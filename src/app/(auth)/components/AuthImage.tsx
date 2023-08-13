import Image from "next/image";
import React from "react";

const AuthImage = () => {
  return (
    <Image
      src={"https://picsum.photos/400/600?random=5&grayscale&blur=2"}
      width="0"
      height="0"
      sizes="100vw"
      className="w-full shadow-2xl opacity-50 h-full object-cover"
      alt="auth image"
    />
  );
};

export default AuthImage;

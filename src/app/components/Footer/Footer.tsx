"use client";

import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { footerLinksData } from "./constants";
import FooterList from "./FooterList";

const Footer = () => {
  return (
    <footer className="bg-[#feec01] text-[#191817]">
      <div className="max-w-7xl md:px-5 py-12 md:py-20 mx-auto flex justify-between md:items-start md:flex-row md:flex-nowrap flex-wrap flex-col md:justify-between gap-16">
        <div className="flex flex-col items-center md:items-start gap-8 md:gap-16">
          <div>
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="font-bold text-5xl">Mentea</span>
            </a>
            <p className="mt-2 text-sm">
              Elevate your career with Mentea one sip at a time
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#191817] w-[40px] h-[40px] rounded-full items-center justify-center flex">
              <TwitterIcon className="text-[#feec01] " />
            </div>
            <div className="bg-[#191817] w-[40px] h-[40px] rounded-full items-center justify-center flex">
              <InstagramIcon className="text-[#feec01] " />
            </div>
            <div className="bg-[#191817] w-[40px] h-[40px] rounded-full items-center justify-center flex">
              <YouTubeIcon className="text-[#feec01] " />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16 md:text-left text-center font-raleway">
          {
            footerLinksData.map((item, index) => {
              return (
                <FooterList key={index} {...item} />
              )
            })
          }
        </div>
      </div>
    </footer>
  );
};

export default Footer;

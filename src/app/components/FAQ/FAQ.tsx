import React from "react";
import { faqData } from "./constants";
import FAQItem from "./FAQItem";

const FAQ = () => {
  return (
    <div className="bg-[#191817]">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#fefffe] text-center mb-16 md:mb-24 font-gothic">
          FREQUENTLY ASKED{" "}
          <span className="text-[#feec01] underline">QUESTIONS</span>
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-12">
          {faqData.map((item, index) => (
            <FAQItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;

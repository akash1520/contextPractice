import React from "react";
import { Balancer } from "react-wrap-balancer";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="flex flex-col bg-[#1f1f1f] rounded-lg p-6 min-h-[200px] lg:min-h-[250px]">
      <h3 className="text-[#feec01] font-bold text-3xl font-gothic tracking-wider">
        <Balancer>{question}</Balancer>
      </h3>
      <p className="text-[#fefffe] text-lg font-medium mt-2 font-raleway">
        <Balancer>{answer}</Balancer>
      </p>
    </div>
  );
};

export default FAQItem;

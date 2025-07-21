import React from "react";
import farmerThinkingImage from "@/assets/farmer/thinking.png";
import faqData from "@/data/faqData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="mx-auto lg:my-20 grid max-w-7xl lg:grid-cols-3 items-start gap-14 px-7">
      <div className="col-span-1 flex justify-center pt-20 lg:pt-28">
        <img
          src={farmerThinkingImage}
          alt="Farmer Thinking"
          className="max-w-xs"
        />
      </div>

      <div className="col-span-2 space-y-5 pr-2">
        <h2 className="mb-14 text-4xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>
                {index + 1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQs;

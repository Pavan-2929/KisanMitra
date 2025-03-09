import { ArrowDown } from "lucide-react";
import React from "react";

const ArrowDownScroll = () => {
  const handleScroll = () => {
    const targetSection = document.getElementById("auth-section");
    targetSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="lg:hidden cursor-pointer pt-12 flex justify-center"
      onClick={handleScroll}
      >
          <ArrowDown className="size-8 animate-bounce"/>
    </div>
  );
};

export default ArrowDownScroll;

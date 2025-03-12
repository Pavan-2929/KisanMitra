import React from "react";

const Stamp = ({ children }) => {
  return (
    <div className="bg-input text-muted-foreground flex items-center rounded-3xl px-6 py-[10px] border text-[13px] font-semibold">
      {children}
    </div>
  );
};

export default Stamp;

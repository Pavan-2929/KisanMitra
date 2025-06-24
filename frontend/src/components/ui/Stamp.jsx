import React from "react";

const Stamp = ({ children }) => {
  return (
    <div className="bg-input text-muted-foreground flex items-center rounded-3xl border px-6 py-[10px] text-sm font-semibold">
      {children}
    </div>
  );
};

export default Stamp;

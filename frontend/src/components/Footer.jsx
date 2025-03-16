import React from "react";

const Footer = () => {
  return (
    <div className="bg-accent text-muted-foreground flex justify-center py-5 border-t text-[15px] font-semibold">
      &copy; {new Date().getFullYear()} All rights reserved.
    </div>
  );
};

export default Footer;

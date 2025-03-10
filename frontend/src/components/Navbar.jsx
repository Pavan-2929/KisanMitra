import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import {
  BotIcon,
  ChevronDown,
  GlobeIcon,
  Mail,
  Phone,
  User2Icon,
  UserIcon,
} from "lucide-react";
import UserAvatar from "@/components/controls/UserAvatar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isTop, setOffSet] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setOffSet(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className="border-b py-1 pb-9 ">
        <div className="mx-auto max-w-7xl ">
          <div className="flex items-center justify-between">
            <div>
              <img src={logo} alt="" className="h-20 w-24" />
            </div>
            <div>
              <h1 className="text-primary font-serif bg-clip-text text-center text-2xl font-semibold">
                Growing Together, Building Futures 🌱
              </h1>
            </div>

            <div className="flex items-center justify-end gap-8">
              <div className="flex cursor-pointer items-center gap-2">
                <GlobeIcon className="text-muted-foreground size-5" />
                <span className="text-muted-foreground text-sm font-medium">
                  EN
                </span>
                <ChevronDown className="text-muted-foreground size-4" />
              </div>
              <UserAvatar />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          !isTop
            ? "text-primary-foreground bg-primary  -m-7 z-20 mx-auto flex max-w-7xl rounded-xl shadow-xl shadow-[#00000059] transition-all duration-300 ease-in-out"
            : "bg-primary text-primary-foreground fixed top-0 z-30 flex w-[100%] shadow-xl shadow-[#00000059] transition-all duration-300 ease-in-out"
        }
      >
        <div
          className={`flex w-[55%] items-center justify-between gap-5 px-7 text-[15px] font-semibold transition-all duration-300 ease-in-out ${!isTop ? "py-4" : "py-5 pl-20"}`}
        >
          <NavLink to="/">E-Commerce</NavLink>
          <NavLink to="/">Blogs</NavLink>
          <NavLink to="/">Resources</NavLink>
          <NavLink to="/">Hire Contractors</NavLink>
          <NavLink to="/">Weather</NavLink>
        </div>
        <div
          className={`${
            !isTop ? "rounded-r-lg py-4" : "py-5"
          } pl-r bg-lightgreen flex w-[45%] items-center justify-between px-7 text-[15px] font-semibold duration-300 ease-in-out`}
        >
          <div className="mx-auto flex items-center justify-center gap-2">
            <Phone />
            <p>+91 00000 00000</p>
          </div>
          <p className="bg-primary-foreground h-6 w-[2px]"></p>
          <div className="mx-auto flex items-center justify-center gap-2">
            <Mail />
            <p>kisanmitra2312@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

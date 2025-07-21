import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import {
  GlobeIcon,
  ChevronDown,
  Mail,
  Phone,
  Menu,
  X,
} from "lucide-react";
import UserAvatar from "@/components/controls/UserAvatar";
import { NavLink } from "react-router-dom";
import LiveWeather from "./LiveWeather";
import { useSelector } from "react-redux";
import Translate from "./controls/Translate";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/all-crops", label: "All Crops" },
  { to: "/upload-crop", label: "Upload Crop" },
  { to: "/blogs", label: "Blogs" },
  { to: "/upload-blog", label: "Upload Blog" },
  { to: "/weather", label: "Weather" },
];

const Navbar = () => {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full z-30 overflow-hidden">
      {/* Top bar */}
      <div className="bg-accent border-b py-1">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="h-16 w-20" />
          </NavLink>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden ml-2 p-2 rounded hover:bg-gray-100"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu className="" size={24} />}
          </button>
          <LiveWeather />
          <div className="flex items-center gap-6">
            <div className="flex cursor-pointer items-center gap-2">
              <GlobeIcon className="text-muted-foreground size-5" />

              <Translate />
            </div>
            <UserAvatar />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ease-in-out ${isTop
          ? "relative bg-primary text-primary-foreground"
          : "fixed top-0 left-0 w-full bg-primary text-primary-foreground shadow-xl"
          } z-20`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 md:px-8">
          {/* Nav links */}
          <div className="hidden md:flex gap-7 py-4 text-[15px] font-semibold">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-300 underline underline-offset-4"
                    : "hover:text-green-200 transition"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden left-0 top-0 w-full bg-primary text-primary-foreground shadow-lg flex flex-col gap-2 py-4 px-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-300 underline underline-offset-4"
                      : "hover:text-green-200 transition"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
          {/* Contact info */}
          <div className="hidden md:flex items-center gap-8 py-4">
            <div className="flex items-center gap-2">
              <Phone />
              <span>+91 12345 67890</span>
            </div>
            <span className="bg-primary-foreground h-6 w-[2px]"></span>
            <div className="flex items-center gap-2">
              <Mail />
              <span>kisanmitra2312@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

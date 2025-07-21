import React from "react";
import avatarImage from "@/assets/avatar.png";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserAvatar = ({ className, size = 50, avatarUrl }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Link to={`${isLogin ? '/profile' : '/signin'}`} >
      <img
        src={avatarUrl || avatarImage}
        alt="User avatar"
        className={cn(
          "rounded-full border object-cover",
          className,
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      /></Link>
  );
};

export default UserAvatar;

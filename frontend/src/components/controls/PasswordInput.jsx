import React, { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ icon, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>
      <Input
        className={cn(
          "h-10 ps-12 pe-12 text-[15px] placeholder:text-[15px]",
          className,
        )}
        type={showPassword ? "text" : "password"}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
      >
        {showPassword ? (
          <EyeOff className="text-muted-foreground/50 size-5" />
        ) : (
          <Eye className="text-muted-foreground/50 size-5" />
        )}
      </button>
    </div>
  );
};

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

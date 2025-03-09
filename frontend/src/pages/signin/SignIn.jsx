import React from "react";
import logo from "../../assets/logo.png";
import ArrowDownScroll from "../../components/controls/ArrowDownScroll";
import Divider from "@/components/Divider";
import SocialAuth from "@/components/SocialAuth";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-8 lg:w-[40vw] lg:px-12">
        <div className="animate-gradient absolute inset-0 bg-[linear-gradient(45deg,hsl(142.1_76.2%_36.3%),hsl(142.1_76.2%_26.3%),hsl(142.1_76.2%_46.3%),hsl(142.1_76.2%_36.3%))] bg-[length:400%_400%]" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${15 + i * 2}s infinite linear`,
              }}
            />
          ))}
        </div>
        <div className="z-10 space-y-6 text-center text-white">
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <img
              src={logo}
              alt="Auth Image"
              className="size-48 drop-shadow-lg"
            />
          </div>
          <p className="text-4xl font-bold text-white/95">Glad to see you!</p>
          <p className="leading-7 font-medium tracking-wide text-white/85">
            Welcome to KisanMitra, the simplest way to track and share expenses
            effortlessly. Let&apos;s get you set up!
          </p>
          <div>
            <ArrowDownScroll />
          </div>
        </div>
      </div>

      <div
        id="auth-section"
        className="bg-card flex flex-col items-center justify-center space-y-10 px-6 py-8 lg:flex-1"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-bold lg:text-3xl">
            Hello, Great to have you here!
          </h1>
          <p className="font-semibold tracking-wider">
            Create your KisanMitra account{" "}
          </p>
        </div>
        <div className="w-full max-w-md space-y-5">
          <div>
            <SignInForm />
          </div>
          <Divider />
          <div className="space-y-5">
            <SocialAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

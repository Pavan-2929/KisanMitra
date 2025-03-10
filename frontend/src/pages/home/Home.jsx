import React from "react";
import backgroundImage from "@/assets/background.jpg";
import { BotIcon, User2Icon, UserIcon } from "lucide-react";

const Home = () => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="h-[90vh] w-full bg-cover bg-center"
    >
      <div className="text-primary-foreground h-[90vh] bg-black/50 px-14 pt-40">
        <div className="mx-auto max-w-7xl space-y-14 px-7">
          <h1 className="w-1/2 font-serif text-5xl leading-[64px] font-semibold tracking-wide">
            Farmers plant hope, harvest strength.{" "}
          </h1>
          <p className="w-1/2 text-lg leading-8 font-medium tracking-wide">
            {" "}
            Farmers are the heart of our land, turning hard work into harvests
            and hope into growth. With unwavering dedication and faith in the
            soil, they nurture the earth to feed the world. Their resilience and
            commitment inspire us to build a better tomorrow, one seed at a
            time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

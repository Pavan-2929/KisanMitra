import Stamp from "@/components/ui/Stamp";
import { MapPin } from "lucide-react";
import React from "react";
import rainImage from "@/assets/weather/rain.png";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="bg-accent h-fit rounded-lg p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Stamp>
          <MapPin className="mr-2 size-4" />
          <p className="font-semibold">
            {weatherData?.name}, {weatherData?.sys?.country}
          </p>
        </Stamp>
        <Stamp>
          <p>°C</p>
        </Stamp>{" "}
      </div>
      <div className="flex justify-between pt-10 xl:pl-5">
        <img src={rainImage} alt="" className="drop-shadow-2xl" />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-muted-foreground text-end text-4xl font-bold">
              {Math.round(weatherData?.main?.temp)} °C
            </h2>
          </div>
          <div></div>
          <div className="space-y-1 text-end">
            <p className="text-muted-foreground text-xl font-bold">
              {weatherData?.weather[0]?.main}
            </p>
            <p className="text-muted-foreground font-medium">
              Feels like {Math.round(weatherData?.main?.feels_like)} °C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

import { format } from "date-fns";
import { Droplets, Eye, Gauge, Wind } from "lucide-react";
import React from "react";
import sunriseImage from "@/assets/weather/sunrise.png";
import sensetImage from "@/assets/weather/sunset.png";
const WeatherHighlight = ({ weatherData }) => {
  return (
    <div className="bg-accent space-y-5 rounded-lg p-5 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">Today&apos;s highlights</h1>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Droplets className="size-5" />
            <span className="font-serif font-medium italic">Humidity</span>
          </div>
          <h2 className="pt-1 pb-1.5 text-xl font-semibold">
            {weatherData?.main?.humidity}
          </h2>
          <p className="text-[13px]">Air moisture (%).</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Wind className="size-5" />
            <span className="font-serif font-medium italic">Air Speed</span>
          </div>
          <h2 className="pt-1 pb-1.5 text-xl font-semibold">
            {weatherData?.wind?.speed}
          </h2>
          <p className="text-[13px]">Air speed (km/h).</p>
        </div>
        <div className="col-span-2 flex items-center justify-between gap-5 rounded-lg border p-5">
          <img src={sunriseImage} alt="" />
          <div className="space-y-1">
            <p className="font-serif text-[17px] font-medium italic">Sunrise</p>
            {weatherData?.sys?.sunrise && (
              <h2 className="text-muted-foreground text-xl font-bold">
                {" "}
                {format(new Date(weatherData?.sys?.sunrise * 1000), "hh:mm a")}
              </h2>
            )}
          </div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Eye className="size-5" />
            <span className="font-serif font-medium italic">Visibility</span>
          </div>
          {weatherData?.visibility && (
            <h2 className="pt-1 pb-1.5 text-xl font-semibold">
              {Math.round(weatherData?.visibility / 1000)}
            </h2>
          )}
          <p className="text-[13px]">Clear distance (km).</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <Gauge className="size-5" />
            <span className="font-serif font-medium italic">Pressure</span>
          </div>
          <h2 className="pt-1 pb-1.5 text-xl font-semibold">
            {weatherData?.main?.pressure}
          </h2>
          <p className="text-[13px]">Air pressure (hPa).</p>
        </div>
        <div className="col-span-2 flex items-center justify-between gap-5 rounded-lg border p-5">
          <img src={sensetImage} alt="" />
          <div className="space-y-1">
            <p className="font-serif text-[17px] font-medium italic">Sunset</p>
            {weatherData?.sys?.sunrise && (
              <h2 className="text-muted-foreground text-xl font-bold">
                {" "}
                {format(new Date(weatherData?.sys?.sunset * 1000), "hh:mm a")}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherHighlight;

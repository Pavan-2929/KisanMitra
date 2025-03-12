import { getCurrentWeather } from "@/api/weather";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Droplets, Eye, Gauge, Mail, MapPin, Wind } from "lucide-react";
import Stamp from "@/components/ui/Stamp";
import { Select, SelectTrigger } from "@/components/ui/select";
import rainImage from "@/assets/weather/rain.png";
import sunriseImage from "@/assets/weather/sunrise.png";
import sensetImage from "@/assets/weather/sunset.png";
import WeatherGraph from "./WeatherGraph";
import PopularWeather from "./PopularWeather";
import cloudSunImage from "@/assets/weather/cloudsun.png";
const Weather = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const data = await getCurrentWeather({ lat, lon });
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching weather:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setError("Please allow to access location");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setError("Location information is unavailable.");
          } else {
            setError("Failed to fetch weather data.");
          }
        },
      );
    } else {
      setError("GeoLocation is not supported");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div className="mx-auto max-w-7xl py-20">
      <div className="flex justify-between gap-10">
        <div className="w-[40%] space-y-10">
          <div className="bg-accent h-fit rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <Select>
                <SelectTrigger>
                  <MapPin className="mr-2 size-4" />
                  <p className="font-semibold">{weatherData?.name}, India</p>
                </SelectTrigger>
              </Select>
              <Stamp>
                <p>{format(currentTime, "MMMM d, yyyy")}</p>
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
          <div>
            <PopularWeather />
          </div>
        </div>
        <div className="w-[57%] space-y-10">
          <div className="bg-accent space-y-5 rounded-lg p-5 shadow-sm">
            <div>
              <h1 className="text-2xl font-semibold">
                Today&apos;s highlights
              </h1>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Droplets className="size-5" />
                  <span className="font-serif font-medium italic">
                    Humidity
                  </span>
                </div>
                <h2 className="pt-1 pb-1.5 text-xl font-semibold">
                  {weatherData?.main?.humidity}
                </h2>
                <p className="text-[13px]">Air moisture (%).</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Wind className="size-5" />
                  <span className="font-serif font-medium italic">
                    Air Speed
                  </span>
                </div>
                <h2 className="pt-1 pb-1.5 text-xl font-semibold">
                  {weatherData?.wind?.speed}
                </h2>
                <p className="text-[13px]">Air speed (km/h).</p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-5 rounded-lg border p-5">
                <img src={sunriseImage} alt="" />
                <div className="space-y-1">
                  <p className="font-serif text-[17px] font-medium italic">
                    Sunrise
                  </p>
                  {weatherData?.sys?.sunrise && (
                    <h2 className="text-muted-foreground text-xl font-bold">
                      {" "}
                      {format(
                        new Date(weatherData?.sys?.sunrise * 1000),
                        "hh:mm a",
                      )}
                    </h2>
                  )}
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Eye className="size-5" />
                  <span className="font-serif font-medium italic">
                    Visibility
                  </span>
                </div>
                <h2 className="pt-1 pb-1.5 text-xl font-semibold">
                  {Math.round(weatherData?.visibility / 1000)}
                </h2>
                <p className="text-[13px]">Clear distance (km).</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Gauge className="size-5" />
                  <span className="font-serif font-medium italic">
                    Pressure
                  </span>
                </div>
                <h2 className="pt-1 pb-1.5 text-xl font-semibold">
                  {weatherData?.main?.pressure}
                </h2>
                <p className="text-[13px]">Air pressure (hPa).</p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-5 rounded-lg border p-5">
                <img src={sensetImage} alt="" />
                <div className="space-y-1">
                  <p className="font-serif text-[17px] font-medium italic">
                    Sunset
                  </p>
                  {weatherData?.sys?.sunrise && (
                    <h2 className="text-muted-foreground text-xl font-bold">
                      {" "}
                      {format(
                        new Date(weatherData?.sys?.sunset * 1000),
                        "hh:mm a",
                      )}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <WeatherGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

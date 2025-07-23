import { getCurrentWeather } from "@/api/weather";
import React, { useEffect, useState } from "react";
import sun from "@/assets/weather/sun.png";

const cities = [
  { name: "Surat", lat: 21.1702, lon: 72.8311 },
  { name: "Vadodara", lat: 22.3072, lon: 73.1812 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Rajkot", lat: 22.3039, lon: 70.8022 },
];

const PopularWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map((city) =>
            getCurrentWeather({ lat: city.lat, lon: city.lon }),
          ),
        );

        setWeatherData(responses);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-accent rounded-xl p-5 shadow-sm">
      <h2 className="text-2xl font-semibold">
        Weather Across Major Indian Cities
      </h2>
      <div className="flex flex-col space-y-5 pt-5">
        {weatherData.map((city, index) => (
          <div key={index} className="grid grid-cols-3 rounded-xl border p-3">
            <div>
              <p className="text-muted-foreground text-[15px] font-medium">
                India
              </p>
              <h2 className="text-xl font-semibold">{city.name}</h2>
              <p className="text-secondary-foreground/65 font-medium">
                {city.weather?.[0].main}
              </p>
            </div>
            <div className="m-auto">
              <img src={sun} alt="" className="size-14" />
            </div>
            <div className="text-muted-foreground my-auto ml-auto text-xl font-bold">
              <p>{city?.main.temp} °C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularWeather;

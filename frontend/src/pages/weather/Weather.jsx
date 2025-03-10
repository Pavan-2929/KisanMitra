import { getCurrentWeather } from "@/api/weather";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (lat, lon) => {
    try {
      const data = await getCurrentWeather({ lat, lon });

      console.log("Weather data:", data);
    } catch (error) {
      console.error("Error fetching weather:", error);
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
          setError("Failed to fetch weather data.");
          console.error("Error fetching weather:", error);
        },
      );
    } else {
      setError("GeoLocation is not supported");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  return <div>This is weather</div>;
};

export default Weather;

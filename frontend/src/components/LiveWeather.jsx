import { getCurrentWeather } from "@/api/weather";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const LiveWeather = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      const data = await getCurrentWeather({ lat, lon });
      setWeatherData(data);
      console.log("Weather data:", data);
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
    <div className="flex items-center justify-between gap-3">
      {error ? (
        <h2 className="text-destructive font-medium">{error}</h2>
      ) : loading ? (
        <Loader2 className="text-muted-foreground size-5 animate-spin" />
      ) : (
        <>
          <div className="text-end">
            <h2 className="text-primary font-serif text-xl font-semibold">
              {weatherData?.name}
            </h2>
            <p className="text-muted-foreground font-medium italic">
              Your City
            </p>
          </div>
          <div className="bg-muted-foreground h-14 w-[2px]"></div>
          <div className="text-start">
            <h2 className="text-primary font-serif text-xl font-semibold">
              {weatherData?.main?.temp} °C
            </h2>
            <p className="text-muted-foreground font-medium italic">
              Temparature
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveWeather;

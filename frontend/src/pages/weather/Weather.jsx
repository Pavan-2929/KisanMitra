import { getCityNames, getCurrentWeather } from "@/api/weather";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Stamp from "@/components/ui/Stamp";
import WeatherGraph from "./WeatherGraph";
import PopularWeather from "./PopularWeather";
import WeatherCard from "./WeatherCard";
import WeatherHighlight from "./WeatherHighlight";
import { Loader2, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
const Weather = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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
          setLat(latitude);
          setLon(longitude);
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

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      try {
        const data = await getCityNames(query);

        setSuggestions(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchCities, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 py-16">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for a location..."
            className="bg-input text-foreground/80 h-10 w-[300px] rounded-xl pe-12 font-medium placeholder:text-[15px] placeholder:font-medium"
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          >
            <SearchIcon className="text-muted-foreground size-5" />
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="bg-accent absolute top-full left-0 z-10 mt-1 w-full overflow-auto rounded-lg shadow-xl">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="hover:bg-input cursor-pointer border p-2"
                  onClick={() => {
                    setQuery("");
                    setLat(city.lat);
                    setLon(city.lon);
                    setSuggestions([]);
                    fetchWeather(city.lat, city.lon);
                  }}
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Stamp>
          <p>{format(currentTime, "MMMM d, yyyy")}</p>
        </Stamp>{" "}
      </div>
      {weatherData && !error && (
        <div className="flex justify-between gap-10">
          <div className="w-[40%] space-y-10">
            <WeatherCard weatherData={weatherData} />
            <PopularWeather />
          </div>
          <div className="w-[57%] space-y-10">
            <WeatherHighlight weatherData={weatherData} />
            <WeatherGraph lat={lat} lon={lon} />
          </div>
        </div>
      )}

      {error && (
        <p className="text-destructive mx-auto my-7 text-center font-semibold">
          {error}
        </p>
      )}

      {loading && (
        <Loader2 className="text-primary my-7 flex size-11 w-full animate-spin justify-center" />
      )}
    </div>
  );
};

export default Weather;

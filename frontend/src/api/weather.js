import axios from "axios";
import { API_CONFIG } from "./config";

export const getCurrentWeather = async ({ lat, lon }) => {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_CONFIG.API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error("Error fetching weather data");
  }
};

export const getTodayWeather = async ({ lat, lon }) => {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_CONFIG.API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};

export const getDailyForecast = async ({ lat, lon }) => {
  try {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_CONFIG.API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};

export const getCityNames = async (query) => {
  console.log(query);

  try {
    const response = await axios.get(`${API_CONFIG.CITY_URL}`, {
      params: {
        q: query,
        limit: 5,
        appid: API_CONFIG.API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching city name:", error);
    throw new Error("Error fetching city name");
  }
};

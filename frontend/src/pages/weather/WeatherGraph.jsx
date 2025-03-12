import { getTodayWeather } from "@/api/weather";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const WeatherGraph = () => {
  const [hourlyData, setHourlyData] = useState();

  const fetchHouryWeatherData = async (lat, lon) => {
    try {
      const weatherData = await getTodayWeather({ lat, lon });

      if (!weatherData.list) return;

      const hourelyForecaseData = weatherData.list.slice(0, 8).map((item) => ({
        time: item.dt_txt.split(" ")[1],
        temp: item.main.temp,
      }));

      setHourlyData(hourelyForecaseData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--primary)",
    },
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchHouryWeatherData(latitude, longitude);
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
    <>
      {hourlyData && (
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle>24-Hour Temperature Trends</CardTitle>
            <CardDescription>
              Visualizing temperature changes over the past 24 hours.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={hourlyData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 2)}
                  className="text-muted-foreground text-base font-semibold"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="temp"
                  type="linear"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default WeatherGraph;

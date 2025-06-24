import { getTodayWeather } from "@/api/weather";
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
import { format, parseISO } from "date-fns";
const WeatherGraph = ({ lat, lon }) => {
  const [hourlyData, setHourlyData] = useState([]);

  const fetchHouryWeatherData = async (lat, lon) => {
    if (!lat || !lon) {
      console.error("Latitude or Longitude is missing!", { lat, lon });
      return null;
    }

    try {
      const weatherData = await getTodayWeather({ lat, lon });

      if (!weatherData.list) return;

      const hourelyForecaseData = weatherData.list.slice(0, 8).map((item) => ({
        time: format(parseISO(item.dt_txt), "h a"),
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

  useEffect(() => {
    if (lat && lon) {
      fetchHouryWeatherData(lat, lon);
    }
  }, [lat, lon]);

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
                  tickFormatter={(value) => value}
                  tick={{ dy: 10 }}
                  className="text-muted-foreground text-sm font-medium"
                />
                <YAxis
                  tick={{ dx: -10 }}
                  tickFormatter={(temp) => `${temp}°C`}
                  className="text-muted-foreground text-sm font-medium"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Tooltip formatter={(value) => `${value}°C`} />
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

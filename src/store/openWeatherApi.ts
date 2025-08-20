import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_OWM_API_KEY as string;

export interface CurrentWeather {
  name?: string;
  dt: number;
  weather: { main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number };
}

export interface HourlyWeather {
  hourly: {
    dt: number;
    temp: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  }[];
}

export const openWeatherApi = createApi({
  reducerPath: "openWeatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org" }),
  endpoints: (build) => ({
    searchCity: build.query<{ name: string; lat: number; lon: number; country: string }[], string>({
      query: (q) => ({
        url: "/geo/1.0/direct",
        params: { q, limit: 5, appid: API_KEY },
      }),
    }),
    getCurrentWeatherByCoords: build.query<CurrentWeather, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: "/data/2.5/weather",
        params: { lat, lon, units: "metric", appid: API_KEY },
      }),
    }),
    getHourlyWeather: build.query<HourlyWeather, { lat: number; lon: number }>({
      query: ({ lat, lon }) => ({
        url: "/data/3.0/onecall",
        params: {
          lat,
          lon,
          exclude: "minutely,daily,alerts",
          units: "metric",
          appid: API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useLazySearchCityQuery,
  useGetCurrentWeatherByCoordsQuery,
  useLazyGetCurrentWeatherByCoordsQuery,
  useLazyGetHourlyWeatherQuery,
} = openWeatherApi;

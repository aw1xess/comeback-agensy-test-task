"use client";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/hooks";
import {
  useLazyGetCurrentWeatherByCoordsQuery,
  useLazyGetHourlyWeatherQuery,
} from "@/store/openWeatherApi";
import styles from "@/components/CityCard.module.scss";
import { useEffect } from "react";

export default function CityDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const city = useAppSelector((state) => state.cities.items.find((c) => c.id === id));

  const [triggerLoadCurrentWeather, { data: current, isFetching: isFetchingCurrent }] =
    useLazyGetCurrentWeatherByCoordsQuery();

  const [triggerLoadHourlyWeather, { data: oneCall, isFetching: isFetchingOneCall }] =
    useLazyGetHourlyWeatherQuery();

  useEffect(() => {
    if (city) {
      triggerLoadCurrentWeather({ lat: city.lat, lon: city.lon });
      triggerLoadHourlyWeather({ lat: city.lat, lon: city.lon });
    }
  }, [city, triggerLoadCurrentWeather, triggerLoadHourlyWeather]);

  if (!city) return <Typography>Місто не знайдено</Typography>;

  const icon = current?.weather?.[0]?.icon;
  const temp = Math.round(current?.main?.temp ?? 0);
  const desc = current?.weather?.[0]?.description ?? "";

  const handleRefresh = () => {
    if (city) {
      triggerLoadCurrentWeather({ lat: city.lat, lon: city.lon });
      triggerLoadHourlyWeather({ lat: city.lat, lon: city.lon });
    }
  };

  return (
    <Card className={styles.card} variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{city.name}</Typography>
          {icon && (
            <Image
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon"
              width={64}
              height={64}
            />
          )}
        </Stack>
        <div className={styles.temp}>{isFetchingCurrent ? "..." : `${temp}°`}</div>
        <div className={styles.sub}>{desc}</div>

        {current && (
          <Box mt={2}>
            <Typography>Відчувається як: {current.main.feels_like}°C</Typography>
            <Typography>Вологість: {current.main.humidity}%</Typography>
            <Typography>Тиск: {current.main.pressure} hPa</Typography>
            <Typography>Вітер: {current.wind.speed} м/с</Typography>
          </Box>
        )}

        <Typography variant="h6" mt={2}>
          Погодинний прогноз
        </Typography>

        <Box display="flex" overflow="auto" sx={{ gap: 1, py: 1 }}>
          {isFetchingOneCall && <CircularProgress />}
          {oneCall?.hourly.slice(0, 24).map((hour) => (
            <Box
              key={hour.dt}
              minWidth={60}
              textAlign="center"
              border="1px solid #ddd"
              borderRadius={2}
              p={1}
            >
              <Typography variant="body2">{new Date(hour.dt * 1000).getHours()}:00</Typography>
              <Image
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt="icon"
                width={40}
                height={40}
              />
              <Typography variant="body1">{Math.round(hour.temp)}°C</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <Tooltip title="Оновити зараз">
          <IconButton onClick={handleRefresh}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Button onClick={() => router.back()}>Назад</Button>
      </CardActions>
    </Card>
  );
}

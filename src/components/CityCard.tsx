"use client";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import {
  useGetCurrentWeatherByCoordsQuery,
  useLazyGetCurrentWeatherByCoordsQuery,
} from "@/store/openWeatherApi";
import { useRouter } from "next/navigation";
import styles from "./CityCard.module.scss";
import { useAppDispatch } from "@/hooks/hooks";
import { removeCity } from "@/store/citiesSlice";

export default function CityCard({
  id,
  name,
  lat,
  lon,
}: {
  id: string;
  name: string;
  lat: number;
  lon: number;
}) {
  const { data, isFetching, refetch } = useGetCurrentWeatherByCoordsQuery({
    lat,
    lon,
  });
  const [triggerLoadCurrentWeather] = useLazyGetCurrentWeatherByCoordsQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const icon = data?.weather?.[0]?.icon;
  const temp = Math.round(data?.main?.temp ?? 0);
  const desc = data?.weather?.[0]?.description ?? "";

  return (
    <Card className={styles.card} variant="outlined">
      <CardContent onClick={() => router.push(`/city/${id}`)} style={{ cursor: "pointer" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{name}</Typography>
          {icon && (
            <Image
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon"
              width={64}
              height={64}
            />
          )}
        </Stack>
        <div className={styles.temp}>{isFetching ? "..." : `${temp}°`}</div>
        <div className={styles.sub}>{desc}</div>
      </CardContent>
      <CardActions>
        <Tooltip title="Оновити зараз">
          <IconButton
            aria-label="refresh"
            onClick={() => triggerLoadCurrentWeather({ lat, lon }).then(() => refetch())}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Видалити місто">
          <IconButton aria-label="delete" onClick={() => dispatch(removeCity(id))}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Button onClick={() => router.push(`/city/${id}`)}>Детальніше</Button>
      </CardActions>
    </Card>
  );
}

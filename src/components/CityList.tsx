"use client";
import { useAppSelector } from "@/hooks/hooks";
import CityCard from "./CityCard";
import Box from "@mui/material/Box";

export default function CityList() {
  const cities = useAppSelector((state) => state.cities.items);
  if (!cities.length) return <Box sx={{ mt: 2 }}>Додайте перше місто, щоб побачити погоду.</Box>;
  return (
    <div className="grid">
      {cities.map((city) => (
        <CityCard key={city.id} {...city} />
      ))}
    </div>
  );
}

"use client";
import { Stack, Typography } from "@mui/material";
import AddCityButton from "@/components/AddCityButton";
import CityList from "@/components/CityList";

export default function HomePage() {
  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Погода у вибраних містах</Typography>
        <AddCityButton />
      </Stack>
      <CityList />
    </Stack>
  );
}

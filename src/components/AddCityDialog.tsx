"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useLazySearchCityQuery } from "@/store/openWeatherApi";
import { useAppDispatch } from "@/hooks/hooks";
import { addCity } from "@/store/citiesSlice";
import { v4 as uuidv4 } from "uuid";

type Option = { label: string; lat: number; lon: number };

export default function AddCityDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [triggerSearchCity, { data, isFetching }] = useLazySearchCityQuery();
  const dispatch = useAppDispatch();

  const options: Option[] = (data ?? []).map((d) => ({
    label: `${d.name}, ${d.country}`,
    lat: d.lat,
    lon: d.lon,
  }));

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Додати місто</DialogTitle>
      <DialogContent>
        <Autocomplete
          loading={isFetching}
          options={options}
          getOptionKey={() => uuidv4()}
          onOpen={() => {
            if (query) triggerSearchCity(query);
          }}
          onInputChange={(_, value) => {
            setQuery(value);
            if (value.trim()) triggerSearchCity(value.trim());
          }}
          getOptionLabel={(o) => o.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Пошук міста"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isFetching ? <CircularProgress size={18} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
          onChange={(_, value) => {
            if (value) {
              const id = `${value.lat}-${value.lon}`;
              dispatch(addCity({ id, name: value.label, lat: value.lat, lon: value.lon }));
              onClose();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Скасувати</Button>
      </DialogActions>
    </Dialog>
  );
}

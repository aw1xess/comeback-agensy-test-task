import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { City } from "./citiesPersist";

type CitiesState = { items: City[] };

const initialState: CitiesState = { items: [] };

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    hydrateFromStorage(state, action: PayloadAction<City[]>) {
      state.items = action.payload;
    },
    addCity(state, action: PayloadAction<City>) {
      if (!state.items.find((city) => city.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.items = state.items.filter((city) => city.id !== action.payload);
    },
  },
});

export const { addCity, removeCity, hydrateFromStorage } = citiesSlice.actions;
export default citiesSlice.reducer;

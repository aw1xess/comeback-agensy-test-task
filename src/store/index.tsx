"use client";
import { configureStore } from "@reduxjs/toolkit";
import { openWeatherApi } from "./openWeatherApi";
import citiesReducer, { hydrateFromStorage } from "./citiesSlice";
import { loadCities, saveCities } from "./citiesPersist";
import { useRef } from "react";
import { Provider } from "react-redux";

export const makeStore = () =>
  configureStore({
    reducer: {
      cities: citiesReducer,
      [openWeatherApi.reducerPath]: openWeatherApi.reducer,
    },
    middleware: (gDM) => gDM().concat(openWeatherApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(hydrateFromStorage(loadCities()));
    let prev = storeRef.current.getState().cities.items;
    storeRef.current.subscribe(() => {
      const curr = storeRef.current!.getState().cities.items;
      if (curr !== prev) {
        saveCities(curr);
        prev = curr;
      }
    });
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

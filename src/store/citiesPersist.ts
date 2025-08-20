const KEY = "cities_v1";

export type City = {
  id: string;
  name: string;
  lat: number;
  lon: number;
};

export function loadCities(): City[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCities(cities: City[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cities));
  } catch {}
}

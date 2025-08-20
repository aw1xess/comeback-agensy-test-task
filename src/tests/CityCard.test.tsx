import { screen, fireEvent } from "@testing-library/react";
import CityCard from "@/components/CityCard";
import { renderWithProviders } from "@/tests/test-utils";

const mockCity = {
  name: "Kyiv",
  country: "UA",
  lat: 50.45,
  lon: 30.52,
};

const mockCityCard = (
  <CityCard
    id={`${mockCity.lat}-${mockCity.lon}`}
    name={mockCity.name}
    lat={mockCity.lat}
    lon={mockCity.lon}
  />
);

const preloadedState = {
  cities: {
    items: [{ id: "1", name: "Kyiv, UA", lat: 50.45, lon: 30.52 }],
  },
};

describe("CityCard", () => {
  it("рендерить назву міста", () => {
    renderWithProviders(mockCityCard, { preloadedState });

    expect(screen.getByText(/Kyiv/)).toBeInTheDocument();
  });

  it("рендерить кнопку Refresh", () => {
    renderWithProviders(mockCityCard, { preloadedState });
    const btn = screen.getByRole("button", { name: /refresh/i });
    expect(btn).toBeInTheDocument();
  });

  it("викликає оновлення при кліку на Refresh", () => {
    const { rerender } = renderWithProviders(mockCityCard, { preloadedState });
    const btn = screen.getByRole("button", { name: /refresh/i });
    fireEvent.click(btn);
    rerender(mockCityCard);
    expect(screen.getByText(/Kyiv/)).toBeInTheDocument();
  });
});

import { screen } from "@testing-library/react";
import CityDetailPage from "@/app/city/[id]/page";
import { renderWithProviders } from "@/tests/test-utils";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "50.45-30.52" }),
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("City Page", () => {
  it("рендерить детальну інформацію про місто", () => {
    renderWithProviders(<CityDetailPage />);
    expect(screen.getByText(/Kyiv/)).toBeInTheDocument();
  });

  it("має кнопку Refresh", () => {
    renderWithProviders(<CityDetailPage />);
    expect(screen.findByRole("button", { name: /Оновити зараз/i })).toBeInTheDocument();
  });

  it("відображає погодинний прогноз", () => {
    renderWithProviders(<CityDetailPage />);
    expect(screen.findByText(/Погодинний прогноз/i)).toBeInTheDocument();
  });
});

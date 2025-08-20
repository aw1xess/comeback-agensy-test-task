import { screen, fireEvent } from "@testing-library/react";
import AddCityDialog from "@/components/AddCityDialog";
import { renderWithProviders } from "@/tests/test-utils";

describe("AddCityDialog", () => {
  it("відкриває діалог", () => {
    renderWithProviders(<AddCityDialog isOpen={true} onClose={jest.fn()} />);
    const btn = screen.getByText("Додати місто");
    fireEvent.click(btn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("додає місто після вводу", () => {
    renderWithProviders(<AddCityDialog isOpen={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText("Додати місто"));

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Kyiv" } });

    const addOption = screen.getByRole("option");
    fireEvent.click(addOption);

    expect(screen.getByRole("combobox")).not.toBeInTheDocument();
  });
});

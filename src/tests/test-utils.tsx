import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore, AppStore, RootState } from "@/store";
import { ReactElement } from "react";

export function renderWithProviders(
  ui: ReactElement,
  {
    store = makeStore(),
    ...renderOptions
  }: { preloadedState?: Partial<RootState>; store?: AppStore } = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

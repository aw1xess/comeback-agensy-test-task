"use client";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { theme } from "./theme";
import { StoreProvider } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">{children}</Container>
      </ThemeProvider>
    </StoreProvider>
  );
}

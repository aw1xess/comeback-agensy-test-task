"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: { mode: "light" },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});

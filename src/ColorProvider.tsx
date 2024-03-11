// Import necessary dependencies
import React, { useState, useMemo, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

// Create a context for color mode
export const ColorModeContext = createContext({
  ColorProvider: () => {},
});

// Define the ColorProvider component
export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  // Define state for color mode
  const [mode, setMode] = useState<"light" | "dark">("dark");

  // Create a memoized object with a function to toggle color mode
  const colorMode = useMemo(
    () => ({
      ColorProvider: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // Create a memoized theme based on the current color mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // Render the ColorProvider component
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

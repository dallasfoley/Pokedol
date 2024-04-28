import { createContext } from "react";

export interface ThemeContextType {
  darkTheme: boolean;
  setDarkTheme: (value: boolean | ((val: boolean) => boolean)) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkTheme: true,
  setDarkTheme: () => {},
});

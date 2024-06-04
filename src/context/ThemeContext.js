import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../utils/desing";

export const ThemeContext = createContext({
  theme: undefined,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const themeStyles = theme === "light" ? lightTheme : darkTheme;

  const valueContext = {
    theme: themeStyles,
    toggleTheme,
    currentTheme: theme,
  };

  return (
    <ThemeContext.Provider value={valueContext}>
      {children}
    </ThemeContext.Provider>
  );
}

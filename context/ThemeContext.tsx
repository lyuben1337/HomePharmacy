import React, { createContext, useEffect, useState } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Theme = "light" | "dark" | "system";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  toggleTheme: () => { },
});

export default function ThemeProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
          setTheme(savedTheme as Theme);
          if (savedTheme !== "system") {
            setStatusBarStyle(savedTheme === "dark" ? "light" : "dark");
          }
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  const toggleTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    if (newTheme !== "system") {
      setStatusBarStyle(newTheme === "dark" ? "light" : "dark");
    } else setStatusBarStyle("auto");
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

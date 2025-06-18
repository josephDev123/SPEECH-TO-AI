import { ThemeContext } from "@/context/Theme";
import { Sun, Moon } from "lucide-react";
import { useContext, useEffect } from "react";

export default function SwitchTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const ColorTheme =
      localStorage.getItem("theme") || (theme as "light" | "dark");
    document.documentElement.classList.add(ColorTheme);
    setTheme(ColorTheme as "light" | "dark");
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);

        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }}
      className="inline-flex gap-2"
    >
      {theme == "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

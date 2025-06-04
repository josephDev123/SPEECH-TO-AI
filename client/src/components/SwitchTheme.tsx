import { ThemeContext } from "@/context/Theme";
import { Sun, Moon } from "lucide-react";
import { useContext } from "react";

export default function SwitchTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex gap-2"
    >
      {theme == "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

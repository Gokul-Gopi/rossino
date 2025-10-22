import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>Switch to {theme === "light" ? "Dark" : "Light"} mode</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DarkMode;

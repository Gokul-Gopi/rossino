import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components//ui/Tooltip";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="hover:text-primary border-primary/20 bg-card hover:bg-transparent"
          variant="outline"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </Button>
      </TooltipTrigger>

      <TooltipContent className="font-medium">
        <p>Switch to {theme === "light" ? "Dark" : "Light"} mode</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DarkMode;

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/utils/helpers";

interface IData {
  value: string;
  label: string;
}

interface ISearchableSelectProps {
  data: IData[];
  placeholder?: string;
  notFoundText?: string;
  icon?: React.ReactNode;
  allowDeselect?: boolean;
  triggerProps?: React.ComponentProps<typeof Button>;
}

const SearchableSelect = ({
  data,
  placeholder,
  notFoundText = "No results found.",
  icon,
  allowDeselect = true,
  triggerProps,
}: ISearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          {...triggerProps}
        >
          <p className="flex items-center gap-1 truncate">
            {icon && icon}
            <span className="truncate">
              {value
                ? data.find((el) => el.value === value)?.label
                : placeholder}
            </span>
          </p>

          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command className="bg-card">
          <CommandInput placeholder="Search" className="h-9" />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>

            <CommandGroup>
              {data.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
                    if (!allowDeselect && value && value === currentValue)
                      return;

                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {el.label}
                  <Check
                    className={cn(
                      value === el.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelect;

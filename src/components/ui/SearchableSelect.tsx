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
}

const SearchableSelect = ({
  data,
  placeholder,
  notFoundText = "No results found.",
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
          className="justify-between active:scale-100"
        >
          {value
            ? data.find((el) => el.value === value)?.label
            : "Select a project..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>

            <CommandGroup>
              {data.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={(currentValue) => {
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

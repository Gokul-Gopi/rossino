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
import { Spinner } from "./Spinner";

interface IData {
  value: string;
  label: string;
}

interface ISearchableSelectProps {
  data: IData[];
  value: string;
  setValue: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
  notFoundText?: string;
  icon?: React.ReactNode;
  triggerProps?: React.ComponentProps<typeof Button>;
}

const SearchableSelect = ({
  data,
  value,
  setValue,
  searchQuery,
  setSearchQuery,
  loading,
  placeholder,
  notFoundText = "No results found.",
  icon,

  triggerProps,
}: ISearchableSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          {...triggerProps}
        >
          <p className="flex items-center gap-1.5 truncate">
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
        <Command
          className="bg-card"
          filter={(id, searchQuery) => {
            const item =
              data.find((el) => el.value === id)?.label.toLowerCase() || "";
            const search = searchQuery.toLowerCase();

            if (item.includes(search)) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder="Search"
            className="h-9"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {loading ? (
              <div className="h-[5rem]">
                <Spinner className="mx-auto mt-4" />
              </div>
            ) : (
              <CommandEmpty>{notFoundText}</CommandEmpty>
            )}

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

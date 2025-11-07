import { ScrollArea } from "@/components/ui/ScrollArea";
import { Textarea } from "@/components/ui/Textarea";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useWidgetsStore } from "@/store";
import { useEffect, useState } from "react";

const QuickNotes = () => {
  const { note, setNote } = useWidgetsStore();
  const [value, setValue] = useState(note);

  const debouncedNote = useDebouncedValue(value);

  useEffect(() => {
    setNote(debouncedNote);
  }, [debouncedNote, setNote]);

  return (
    <ScrollArea className="h-full max-h-[17.2rem] overflow-y-auto">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Put your quick notes here..."
        className="min-h-[17rem] resize-none overflow-hidden border-none p-0 shadow-none outline-none focus-within:border-0 focus-visible:ring-0 dark:bg-transparent"
      />
    </ScrollArea>
  );
};

export default QuickNotes;

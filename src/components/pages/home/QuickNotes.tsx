import { ScrollArea } from "@/components/ui/ScrollArea";
import { Textarea } from "@/components/ui/Textarea";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useWidget } from "@/query/widget.queries";
import useStore, { useStoreActions } from "@/store";
import { useEffect, useState } from "react";

const QuickNotes = () => {
  const userId = useStore((state) => state.userId);
  const note = useStore((state) => state.note);

  const { setNote } = useStoreActions();

  const [value, setValue] = useState(note);
  const debouncedNote = useDebouncedValue(value, 500);

  const noteQuery = useWidget();

  useEffect(() => {
    if (note === debouncedNote) return;

    setNote(debouncedNote);

    if (userId) {
      (noteQuery.mutate({ id: userId, note: debouncedNote }),
        {
          onError: () => {
            setNote(note);
          },
        });
    }
  }, [debouncedNote, setNote]);

  return (
    <ScrollArea className="h-full max-h-[17.2rem] overflow-y-auto">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={2000}
        placeholder="Put your quick notes here..."
        className="min-h-[17rem] resize-none overflow-hidden border-none p-0 shadow-none outline-none focus-within:border-0 focus-visible:ring-0 max-md:text-sm dark:bg-transparent"
      />
    </ScrollArea>
  );
};

export default QuickNotes;

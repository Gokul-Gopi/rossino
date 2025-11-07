import { Textarea } from "@/components/ui/Textarea";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const QuickNotes = () => {
  return (
    <ScrollArea className="h-full max-h-[16.5rem] overflow-y-auto">
      <Textarea
        placeholder="Don't use your phone during breaks. It will brain rot you."
        className="h-[16.5rem] resize-none border-none p-0 shadow-none outline-none focus-within:border-0 focus-visible:ring-0"
      />
    </ScrollArea>
  );
};

export default QuickNotes;

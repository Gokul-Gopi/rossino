import { useWidgetsStore } from "@/store";

const Interruptions = () => {
  const { pausedCount, pausedDuration } = useWidgetsStore();

  console.log("Interruptions component rendered");

  return (
    <ul className="mt-4 flex flex-col gap-2">
      <li className="bg-muted-foreground/5 flex items-center justify-between rounded-md px-3 py-2 text-sm">
        <span className="text-card-foreground font-medium">Paused counts</span>
        <span className="text-card-foreground/80">{pausedCount}</span>
      </li>

      <li className="bg-muted-foreground/5 flex items-center justify-between rounded-md px-3 py-2 text-sm">
        <span className="text-card-foreground font-medium">
          Paused Duration
        </span>
        <span className="text-card-foreground/80">
          {Math.floor(pausedDuration / 60)} min
        </span>
      </li>
    </ul>
  );
};

export default Interruptions;

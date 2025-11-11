const Interuptions = () => {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      <li className="bg-muted-foreground/5 flex items-center justify-between rounded-md px-3 py-2 text-sm">
        <span className="text-card-foreground font-medium">Paused counts</span>
        <span className="text-card-foreground/80">{2}</span>
      </li>

      <li className="bg-muted-foreground/5 flex items-center justify-between rounded-md px-3 py-2 text-sm">
        <span className="text-card-foreground font-medium">
          Paused Duration
        </span>
        <span className="text-card-foreground/80">55 min</span>
      </li>
    </ul>
  );
};

export default Interuptions;

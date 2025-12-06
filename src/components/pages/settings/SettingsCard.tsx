import { cn } from "@/utils/helpers";

interface ISettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsCard = ({ title, children, className }: ISettingsCardProps) => {
  return (
    <div
      className={cn(
        "border-input bg-card rounded-lg border p-5 shadow-xs",
        className,
      )}
    >
      <h4 className="text-primary">{title}</h4>

      {children}
    </div>
  );
};

export default SettingsCard;

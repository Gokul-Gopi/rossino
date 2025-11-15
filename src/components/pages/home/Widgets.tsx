import { cn } from "@/utils/helpers";
import { type HTMLMotionProps, motion, type MotionProps } from "motion/react";
import QuickNotes from "./QuickNotes";
import Interruptions from "./Interruptions";

const commonMotionProps: MotionProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

interface WidgetCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  heading?: string;
  description?: string;
}

const WidgetCard = ({
  children,
  heading,
  description,
  className,
  ...props
}: WidgetCardProps) => {
  return (
    <motion.div
      {...props}
      className={cn(
        "bg-card flex flex-col rounded-2xl border p-4 shadow",
        className,
      )}
    >
      {heading && (
        <h4 className="text-primary mb-1 font-semibold">{heading}</h4>
      )}

      {description && (
        <p className="text-muted-foreground text-sm font-medium">
          {description}
        </p>
      )}

      {children}
    </motion.div>
  );
};

const Widgets = () => {
  return (
    <div className="flex grid-cols-2 grid-rows-3 flex-col gap-4 md:grid md:gap-6">
      <WidgetCard
        {...commonMotionProps}
        transition={{ delay: 0.3 }}
        heading="Quick Notes"
        className="row-span-2"
      >
        <QuickNotes />
      </WidgetCard>

      <WidgetCard
        {...commonMotionProps}
        transition={{ delay: 0.5 }}
        heading="Interruptions"
        className="col-start-1 row-start-3 justify-between"
      >
        <Interruptions />
      </WidgetCard>

      <WidgetCard
        {...commonMotionProps}
        transition={{ delay: 0.1 }}
        heading="Timer style"
        className="col-start-2 row-start-1 justify-between"
      >
        Clock style
      </WidgetCard>

      <WidgetCard
        {...commonMotionProps}
        transition={{ delay: 0.8 }}
        heading="Bacground music"
        className="col-start-2 row-span-2 row-start-2"
      >
        Music
      </WidgetCard>
    </div>
  );
};

export default Widgets;

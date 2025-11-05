import { cn } from "@/utils/helpers";
import { type HTMLMotionProps, motion, MotionProps } from "motion/react";

const commonMotionProps: MotionProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  heading: string;
}

const Card = ({ heading, children, className, ...props }: CardProps) => {
  return (
    <motion.div
      {...props}
      className={cn("bg-card rounded-2xl border p-4 shadow", className)}
    >
      <h4 className="text-primary text mb-4 border-b pb-2 font-medium">
        {heading}
      </h4>
      {children}
    </motion.div>
  );
};

const TodaySummary = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-8">
      <Card
        {...commonMotionProps}
        transition={{ delay: 0.3 }}
        heading="Focused Time"
        className="row-span-2"
      >
        1
      </Card>

      <Card
        {...commonMotionProps}
        transition={{ delay: 0.5 }}
        heading="Interruptions"
        className="col-start-1 row-start-3"
      >
        2
      </Card>

      <Card
        {...commonMotionProps}
        transition={{ delay: 0.1 }}
        heading="Project worked on"
        className="col-start-2 row-start-1"
      >
        5
      </Card>

      <Card
        {...commonMotionProps}
        transition={{ delay: 0.8 }}
        heading="Interruptions"
        className="col-start-2 row-span-2 row-start-2"
      >
        6
      </Card>
    </div>
  );
};

export default TodaySummary;

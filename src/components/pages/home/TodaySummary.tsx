import { cn } from "@/utils/helpers";
import { type HTMLMotionProps, motion, MotionProps } from "motion/react";
import { useMemo } from "react";

const commonMotionProps: MotionProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

// const camelCaseToTitleCase = (str: string) => {
//   const result = str.replace(/([A-Z])/g, " $1");
//   return result.charAt(0).toUpperCase() + result.slice(1);
// };

interface CardProps extends HTMLMotionProps<"div"> {
  heading: string;
  description?: string;
  data: Record<string, string | number>;
}

const Card = ({
  heading,
  description,
  data,
  className,
  ...props
}: CardProps) => {
  const items = useMemo(() => Object.entries(data), [data]);

  return (
    <motion.div
      {...props}
      className={cn(
        "bg-card flex flex-col rounded-2xl border p-4 shadow",
        className,
      )}
    >
      <h4 className="text-primary mb-1 font-semibold">{heading}</h4>

      {description && (
        <p className="text-muted-foreground text-sm font-medium">
          {description}
        </p>
      )}

      {
        <ul className={cn("mt-4 flex flex-col gap-2", {})}>
          {items.map((el) => (
            <li
              key={el[0]}
              className="bg-muted-foreground/5 flex items-center justify-between rounded-md px-3 py-2 text-sm"
            >
              <span className="text-card-foreground font-medium">{el[0]}</span>
              <span className="text-card-foreground/80">{el[1]}</span>
            </li>
          ))}
        </ul>
      }
    </motion.div>
  );
};

const TodaySummary = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-6">
      <Card
        {...commonMotionProps}
        transition={{ delay: 0.3 }}
        heading="Project"
        description="Project currently being worked on"
        className="row-span-2"
        data={{ Name: "Project A", "Last worked on": "2 hours ago" }}
      />

      <Card
        {...commonMotionProps}
        transition={{ delay: 0.5 }}
        heading="Interruptions"
        data={{ "Paused Count": 3, "Paused Duration": "36 min" }}
        className="col-start-1 row-start-3 justify-between"
      />

      <Card
        {...commonMotionProps}
        transition={{ delay: 0.1 }}
        heading="Others"
        className="col-start-2 row-start-1 justify-between"
        data={{ TBA: "TBA", TBA2: "TBA" }}
      />

      <Card
        {...commonMotionProps}
        transition={{ delay: 0.8 }}
        heading="Focus Time"
        description="Time spent on focused work"
        className="col-start-2 row-span-2 row-start-2"
        data={{
          Count: "3",
          Duration: "1 hr 24 min",
          "Tasks Completed": 5,
        }}
      />
    </div>
  );
};

export default TodaySummary;

import { cn } from "@/utils/helpers";
import { useState, useRef, useEffect } from "react";

interface ISegment {
  label?: string;
  value: string;
  icon?: React.ReactNode;
}

interface ISegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  segments: ISegment[];
  highlightClassName?: string;
}

const SegmentedControl = ({
  value,
  onChange,
  segments,
  highlightClassName,
}: ISegmentedControlProps) => {
  const componentReady = useRef(false);
  const itemsRef = useRef<HTMLLabelElement[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setActiveIndex(segments.findIndex((s) => s.value === value));
  }, [value]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, segments.length);
  }, [segments.length]);

  useEffect(() => {
    if (itemsRef.current[activeIndex]) {
      const activeElement = itemsRef.current[activeIndex] as HTMLElement;
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    // Small delay to ensure DOM is painted
    const timeout = setTimeout(() => {
      componentReady.current = true;
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-card relative flex items-center overflow-hidden rounded-full border border-gray-100 p-1.5 shadow-inner select-none dark:border-gray-700">
      <div
        className={cn(
          "bg-primary pointer-events-none absolute top-1.5 bottom-1.5 z-0 rounded-full shadow-md",
          {
            "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]":
              componentReady.current,
          },
          highlightClassName,
        )}
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      {segments.map((item, index) => (
        <label
          key={item.value}
          onClick={() => onChange(item.value)}
          ref={(el) => {
            if (!el) return;
            itemsRef.current[index] = el;
          }}
          className="group relative z-10 flex-1 cursor-pointer"
        >
          <input
            value={item.value}
            checked={index === activeIndex}
            type="radio"
            className="sr-only"
            readOnly
          />

          <div
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-all duration-200",
              {
                "scale-125 text-white": index === activeIndex,
                "text-gray-500": index !== activeIndex,
              },
            )}
          >
            {item.icon}
            {item.label && <span>{item.label}</span>}
          </div>
        </label>
      ))}
    </div>
  );
};

export default SegmentedControl;

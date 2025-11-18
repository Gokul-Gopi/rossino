import { useState, useRef, useEffect } from "react";

interface ISegment {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ISegmentedControlProps {
  segments: ISegment[];
  onChange: (value: string, index: number) => void;
  defaultIndex?: number;
}

const SegmentedControl = ({
  segments,
  onChange,
  defaultIndex = 0,
}: ISegmentedControlProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const componentReady = useRef(false);
  const itemsRef = useRef<HTMLLabelElement[]>([]);

  // Initialize refs array
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, segments.length);
  }, [segments]);

  // Update the highlight position when activeIndex changes
  useEffect(() => {
    if (itemsRef.current[activeIndex]) {
      const activeElement = itemsRef.current[activeIndex] as HTMLElement;
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeIndex, segments]);

  // Handle component mount animation prevention
  useEffect(() => {
    const timeout = setTimeout(() => {
      componentReady.current = true;
    }, 100); // Small delay to ensure DOM is painted
    return () => clearTimeout(timeout);
  }, []);

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index);
    onChange(value, index);
  };

  return (
    <div className="relative flex overflow-hidden rounded-full border border-gray-100 bg-white p-1.5 shadow-inner select-none">
      <div
        className={`pointer-events-none absolute top-1.5 bottom-1.5 z-0 rounded-full bg-[#FF6B6B] shadow-md ${componentReady.current ? "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" : ""}`}
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      {segments.map((item, index) => (
        <label
          key={item.value}
          ref={(el) => {
            if (!el) return;
            itemsRef.current[index] = el;
          }}
          className="group relative z-10 flex-1 cursor-pointer"
          onClick={() => onInputChange(item.value, index)}
        >
          <input
            value={item.value}
            checked={index === activeIndex}
            type="radio"
            className="sr-only"
          />

          <div
            className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors duration-200 ${index === activeIndex ? "text-white" : "text-gray-500 hover:text-gray-700"} `}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default SegmentedControl;

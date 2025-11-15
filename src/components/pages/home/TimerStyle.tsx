import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import useStore, { useStoreActions } from "@/store";

const TimerStyle = () => {
  const timerStyle = useStore((state) => state.timerStyle);
  const { setTimerStyle } = useStoreActions();

  return (
    <RadioGroup
      defaultValue={timerStyle}
      className="mt-4"
      onValueChange={setTimerStyle}
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="RING" id="r1" className="cursor-pointer" />
        <Label htmlFor="r1">Ring</Label>
      </div>

      <div className="flex items-center gap-3">
        <RadioGroupItem value="BAR" id="r2" className="cursor-pointer" />
        <Label htmlFor="r2">Bar</Label>
      </div>
    </RadioGroup>
  );
};

export default TimerStyle;

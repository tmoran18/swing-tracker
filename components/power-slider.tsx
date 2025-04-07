import { Slider } from "@/components/ui/slider";

type PowerSliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const PowerSlider = ({ value, onChange }: PowerSliderProps) => {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">Power Percentage: {value}%</label>
      <div className="relative pt-2 pb-6">
        <Slider value={[value]} onValueChange={(values) => onChange(values[0])} min={25} max={100} step={25} />
        <div className="absolute w-full flex justify-between mt-2 px-1">
          <span className="text-xs text-muted-foreground">25%</span>
          <span className="text-xs text-muted-foreground">50%</span>
          <span className="text-xs text-muted-foreground">75%</span>
          <span className="text-xs text-muted-foreground">100%</span>
        </div>
      </div>
    </div>
  );
};

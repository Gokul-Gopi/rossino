import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/Field";
import { Switch } from "@/components/ui/Switch";

interface IControlledTextInputProps
  extends React.ComponentProps<typeof Switch> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
}

const ControlledSwitch = ({
  name,
  label,
  icon,
  ...props
}: IControlledTextInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...rest }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex w-full justify-between gap-2">
            {label && <FieldLabel>{label}</FieldLabel>}

            <Switch
              checked={value}
              onCheckedChange={onChange}
              {...rest}
              {...props}
              aria-invalid={fieldState.invalid}
            />
          </div>
        </Field>
      )}
    />
  );
};

export default ControlledSwitch;

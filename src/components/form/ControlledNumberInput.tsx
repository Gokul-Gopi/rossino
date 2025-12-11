import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup";

interface IControlledNumberInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type" | "min" | "max"> {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  allowNegative?: boolean;
  description?: string;
  icon?: React.ReactNode;
  rootClassName?: string;
  inputGroupClassName?: string;
}

const ControlledNumberInput = ({
  name,
  label,
  description,
  icon,
  allowNegative = true,
  rootClassName,
  inputGroupClassName,
  ...props
}: IControlledNumberInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...rest }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={rootClassName}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <InputGroup className={inputGroupClassName}>
            {icon && <InputGroupAddon>{icon}</InputGroupAddon>}
            <InputGroupInput
              type="number"
              {...rest}
              onChange={(e) => {
                let value = e.target.value;

                if (value && props.max && +value > props.max) {
                  onChange(props.max);
                  return;
                }

                if (value && props.min !== undefined && +value < props.min) {
                  onChange(props.min);
                  return;
                }

                onChange(value);
              }}
              {...props}
              // prevent scroll to change number input value
              onFocus={(e) =>
                e.target.addEventListener("wheel", (e) => e.preventDefault(), {
                  passive: false,
                })
              }
              onBlur={(e) =>
                e.target.removeEventListener("wheel", (e) => e.preventDefault())
              }
              // prevent "e" on number-input
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              aria-invalid={fieldState.invalid}
            />
          </InputGroup>

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ControlledNumberInput;

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

interface IControlledTextInputProps extends React.ComponentProps<typeof Input> {
  name: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  rootClassName?: string;
  inputGroupClassName?: string;
}

const ControlledTextInput = ({
  name,
  label,
  description,
  icon,
  rootClassName,
  inputGroupClassName,
  ...props
}: IControlledTextInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={rootClassName}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <InputGroup className={inputGroupClassName}>
            {icon && <InputGroupAddon>{icon}</InputGroupAddon>}
            <InputGroupInput
              {...field}
              {...props}
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

export default ControlledTextInput;

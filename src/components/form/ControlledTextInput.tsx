import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/InputGroup";

interface IControlledTextInputProps extends React.ComponentProps<typeof Input> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
}

const ControlledTextInput = ({
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
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <InputGroup>
            {icon && <InputGroupAddon>{icon}</InputGroupAddon>}
            <InputGroupInput
              {...field}
              {...props}
              aria-invalid={fieldState.invalid}
            />
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ControlledTextInput;

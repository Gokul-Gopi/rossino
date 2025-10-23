import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/Field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "../ui/InputGroup";
import { Textarea } from "../ui/Textarea";

interface IControlledTextAreaProps
  extends React.ComponentProps<typeof Textarea> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
}

const ControlledTextArea = ({
  name,
  label,
  icon,
  ...props
}: IControlledTextAreaProps) => {
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
            <InputGroupTextarea
              className="py-1"
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

export default ControlledTextArea;

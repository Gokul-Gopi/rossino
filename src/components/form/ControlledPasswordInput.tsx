import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/Field";
import { Input } from "../ui/Input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/InputGroup";
import { Eye, EyeClosed } from "lucide-react";

interface IControlledPasswordInputProps
  extends React.ComponentProps<typeof Input> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
}

const ControlledPasswordInput = ({
  name,
  label,
  icon,
  ...props
}: IControlledPasswordInputProps) => {
  const { control } = useFormContext();
  const [hidePassword, setHidePassword] = useState(true);

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
              type={hidePassword ? "password" : "text"}
              {...field}
              {...props}
              aria-invalid={fieldState.invalid}
            />

            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer select-none"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeClosed /> : <Eye />}
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ControlledPasswordInput;

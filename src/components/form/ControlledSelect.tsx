import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";

interface IControlledSelectProps extends React.ComponentProps<typeof Select> {
  name: string;
  label?: string;
  description?: string;
  fieldClassName?: string;
}

const ControlledSelect = ({
  name,
  label,
  description,
  fieldClassName,
  ...props
}: IControlledSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={fieldClassName}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <Select {...field} {...props} aria-invalid={fieldState.invalid} />

          {description && <FieldDescription>{description}</FieldDescription>}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ControlledSelect;

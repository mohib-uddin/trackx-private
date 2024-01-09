import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { cn } from "@nextui-org/system";
import {
  Controller,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
  placeholder: string;
  variant: "underlined" | "flat" | "faded" | "bordered" | undefined;
  values: { label: string; value: string }[];
  className?: string;
  label: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const BaseSelect = <T extends FieldValues>({
  placeholder,
  name,
  control,

  className,
  values,
  rules,
  variant,
  label,
}: Props<T>) => {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <>
      <Select
        value={value}
        isInvalid={invalid}
        label={label}
        classNames={{
          label: cn(` ${invalid ? "text-danger" : ""} text-xs !mb-12`),
        }}
        errorMessage={invalid && (error?.message || "Error")}
        onSelectionChange={onChange}
        variant={variant}
        placeholder={placeholder}
        labelPlacement="inside"
        className="w-full"
      >
        {values.map((e) => (
          <SelectItem key={e.label} value={e.value}>
            {e.label}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default BaseSelect;

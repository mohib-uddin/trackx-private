import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/system";
import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "xs";
  extraClass?: string;
  variant?: "underlined" | "flat" | "faded" | "bordered";
  type:
    | "text"
    | "password"
    | "number"
    | "email"
    | "date"
    | "time"
    | "datetime-local";
  label?: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
function BaseInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  extraClass,
  variant = "underlined",
  label,
  type,
  size,
}: Props<T>) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      <Input
        className={extraClass}
        classNames={{
          label: cn(`  ${invalid ? "text-danger" : ""} mb-2`),
        }}
        value={value}
        onChange={(e) => {
          if (type === "date" || type === "datetime-local") {
            onChange(new Date(e.target.value).toISOString());
          }
          if (type === "number") {
            onChange(Number(e.target.value));
          } else {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        type={type}
        label={label}
        variant={variant}
        // @ts-ignore
        size={size || "md"}
        isInvalid={invalid}
        errorMessage={invalid && (error?.message || "Error")}
      />
    </>
  );
}
export default BaseInput;

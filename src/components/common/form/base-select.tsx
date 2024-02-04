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
  values: { id: string; name: string }[] | undefined;
  className?: string;
  isString?: boolean;
  label: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const BaseSelect = <T extends FieldValues>({
  placeholder,
  name,
  control,
  isString = false,
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
  console.log(value, "val");
  return (
    <>
      <Select
        items={values || []}
        value={value ?? ""}
        isInvalid={invalid}
        label={label}
        classNames={{
          label: cn(` ${invalid ? "text-danger" : ""} text-xs !mb-12`),
        }}
        errorMessage={invalid && (error?.message || "Error")}
        onChange={(e) => {
          if (!isString) {
            onChange(Number(e.target.value));
          } else {
            onChange(e.target.value);
          }
        }}
        variant={variant}
        placeholder={placeholder}
        labelPlacement="inside"
        className="w-full"
      >
        {(values || []).map((e) => (
          <SelectItem key={e.id} value={e.id}>
            {e.name}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default BaseSelect;

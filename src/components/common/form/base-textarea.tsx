import { Textarea } from "@nextui-org/input";
import { cn } from "@nextui-org/system";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
const BaseTextArea = <T extends FieldValues>({
  control,
  name,
  placeholder,
  rows = 2,
  rules = {},
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
      <Textarea
        classNames={{
          label: cn(
            `  ${
              invalid ? "text-danger" : "!text-default-600"
            } text-xs !mt-2 !pb-0 `,
          ),
        }}
        variant="underlined"
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        value={value}
        onValueChange={onChange}
        isInvalid={invalid}
        errorMessage={invalid && (error?.message || "Error")}
      />
    </>
  );
};

export default BaseTextArea;

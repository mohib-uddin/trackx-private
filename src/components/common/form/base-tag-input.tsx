import { Chip } from "@nextui-org/chip";
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
  extraClass?: string;
  variant?: "underlined" | "flat" | "faded" | "bordered";
  type: "text" | "password" | "number" | "email" | "date" | "time";
  label?: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
function BaseTagInput<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  variant = "underlined",
  label,
  type,
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
  const [tags, setTags] = React.useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
    onChange(""); // Clear the input field after adding a tag
  };

  // Function to remove a tag from the list
  const handleRemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <>
      <Input
        classNames={{
          label: cn(`  ${invalid ? "text-danger" : ""} mb-2`),
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        label={label}
        variant={variant}
        isInvalid={invalid}
        errorMessage={invalid && (error?.message || "Error")}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim() !== "") {
            handleAddTag(value.trim());
            e.preventDefault();
          }
        }}
      />
      <div>
        <div>
          {tags.map((tag, index) => (
            <Chip
              onClose={() => handleRemoveTag(index)}
              size={"md"}
              className={"p-4 m-0.5"}
              color={"primary"}
              key={index}
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>
    </>
  );
}
export default BaseTagInput;

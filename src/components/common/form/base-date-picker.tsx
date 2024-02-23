import "react-datepicker/dist/react-datepicker.css";

import { Input } from "@nextui-org/input";
import React from "react";
import DatePicker from "react-datepicker";
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
  label: string;
  placeholder: string;
  variant: "underlined" | "flat" | "faded" | "bordered" | undefined;
  size?: "md" | "sm" | "lg" | undefined;
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const BaseInput = <T extends FieldValues>({
  control,
  name,
  variant,
  label,
  size,
  placeholder,
}: Props<T>) => {
  const {
    fieldState: { error },
  } = useController<T>({ name, control });
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Date of birth is required" }}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            onChange={(date) => onChange(date)}
            customInput={
              <Input
                variant={variant}
                size={size || "md"}
                label={label}
                placeholder={placeholder}
              />
            }
            className={"z-[999]"}
            selected={value}
            dateFormat={"MM-dd-yyyy"}
            placeholderText={"mm/dd/yyyy"}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message || "Error"}</p>
      )}
    </>
  );
};

export default BaseInput;

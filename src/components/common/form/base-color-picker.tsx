import React from "react";
import { SketchPicker } from "react-color";
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
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const BaseColorPicker = <T extends FieldValues>({
  control,
  name,
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
          <SketchPicker
            color={value}
            onChangeComplete={(color) => onChange(color.hex)}
          />
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message || "Error"}</p>
      )}
    </>
  );
};

export default BaseColorPicker;

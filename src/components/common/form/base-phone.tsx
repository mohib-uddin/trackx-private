import "react-phone-number-input/style.css";

import React from "react";
import {
  ErrorOption,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  useController,
  UseControllerProps,
  UseFormSetValue,
} from "react-hook-form";
import PhoneInputWithCountrySelect, {
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
  placeholder?: string;
  extraClass?: string;
  setError: (
    name: FieldPath<T> | `root.${string}` | "root",
    error: ErrorOption,
    options?: { shouldFocus: boolean },
  ) => void;
  clearErrors: (
    name?: FieldPath<T> | FieldPath<T>[] | `root.${string}` | "root",
  ) => void;
  setCountryCode: UseFormSetValue<T>;
  label?: string;
  countryCode: string;
} & WithRequiredProperty<UseControllerProps<T>, "control">;
export default function BasePhone<T extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder,
  extraClass,
  label,
  clearErrors,
  setCountryCode,
  setError,
  countryCode,
  defaultValue,
}: Props<T>) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });
  return (
    <div>
      <div className="border-b-medium pb-1.5">
        <label
          data-slot="label"
          className={`text-xs pl-1 pb-1.5 origin-top-left subpixel-antialiased block ${
            invalid ? "text-danger" : "text-foreground-500"
          } cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_3.5px)] pe-2 max-w-full text-ellipsis overflow-hidden`}
        >
          {label}
        </label>
        <PhoneInputWithCountrySelect
          name={name}
          placeholder={placeholder}
          value={value}
          countryCallingCodeEditable={false}
          international={true}
          // withCountryCallingCode

          onCountryChange={(e) => {
            if (e) {
              setCountryCode(
                "countryCode" as Path<T>,
                `+${getCountryCallingCode(e)}` as PathValue<T, Path<T>>,
              );
            }
          }}
          onChange={(e?: string) => {
            if (!e || !isValidPhoneNumber(e)) {
              setError(name, {
                type: "custom",
                message: "invalid phone number",
              });
            } else {
              clearErrors(name);
            }
            console.log(e?.split(countryCode)[1].length, "e");
            return onChange(
              (e?.split(countryCode)[1].length || 0) <= 0 ? undefined : e,
            );
          }}
          defaultCountry={parsePhoneNumber(`${defaultValue}`)?.country || "KW"}
          className="font-normal text-small placeholder:text-foreground-500"
        />
      </div>
      {invalid && (
        <p className={"p-1 text-tiny text-danger"}>
          {error?.message || "Error"}
        </p>
      )}
    </div>
  );
}

"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Avatar } from "@nextui-org/avatar";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import EmployeeService from "@/services/employees/client/employee.service";

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

type Props<T extends FieldValues> = {
  name: string;
  placeholder: string;
  variant: "underlined" | "flat" | "faded" | "bordered" | undefined;
  className?: string;
  label: string;
  isMultiple?: boolean;
} & WithRequiredProperty<UseControllerProps<T>, "control">;

const EmployeeAutocomplete = <T extends FieldValues>({
  placeholder,
  name,
  control,
  isMultiple = false,
  className,
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
  const { useFetchInfiniteEmployees } = EmployeeService();
  const {
    data: userData,
    isLoading: isUserDataLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchInfiniteEmployees(true, "");
  const [, scrollerRef] = useInfiniteScroll({
    shouldUseLoader: true,
    hasMore: hasNextPage,
    onLoadMore: fetchNextPage,
  });
  const users = React.useMemo(
    () => userData?.pages.flatMap((page) => page.data),
    [userData],
  );
  if (!userData || !users) {
    return <></>;
  }

  return (
    <Autocomplete
      scrollRef={scrollerRef}
      variant={variant}
      label={label}
      placeholder={placeholder}
      selectedKey={value}
      multiple={isMultiple}
      labelPlacement="inside"
      isLoading={isUserDataLoading}
      defaultItems={users}
      className="max-w-xs"
      onSelectionChange={(e) => {
        onChange(e);
      }}
    >
      {(user) => (
        <AutocompleteItem
          key={user.id}
          textValue={capitalizeAfterSpace(user.firstName + " " + user.lastName)}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.firstName}
              className="flex-shrink-0"
              size="sm"
              src={user.image ?? ""}
            />
            <div className="flex flex-col">
              <span className="text-small">
                {capitalizeAfterSpace(user.firstName + " " + user.lastName)}
              </span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
export default EmployeeAutocomplete;

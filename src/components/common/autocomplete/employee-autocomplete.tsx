"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Avatar } from "@nextui-org/avatar";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React, { useEffect, useState } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import { getMedia } from "@/_utils/helpers/get-media";
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
  // const { ref, inView } = useInView();
  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView, hasNextPage]);
  const users = React.useMemo(
    () => userData?.pages.flatMap((page) => page.data),
    [userData, isUserDataLoading],
  );

  if (!userData || !users) {
    return <></>;
  }
  return (
    <div className={"flex w-full flex-wrap md:flex-nowrap gap-4"}>
      <Autocomplete
        variant={variant}
        label={label}
        placeholder={placeholder}
        selectedKey={value}
        scrollRef={scrollerRef}
        multiple={isMultiple}
        labelPlacement="inside"
        classNames={{
          base: "",
          listboxWrapper: "max-h-[320px]",
          selectorButton: "text-default-500",
        }}
        isLoading={isUserDataLoading}
        defaultItems={users}
        onSelectionChange={(e) => {
          onChange(e);
        }}
      >
        {(user) => (
          <AutocompleteItem
            key={user.id}
            textValue={capitalizeAfterSpace(
              user.firstName + " " + user.lastName,
            )}
          >
            <div className="flex gap-2 items-center">
              <Avatar
                name={capitalizeAfterSpace(
                  `${user.firstName} ${user.lastName}`,
                )}
                src={
                  user.image
                    ? getMedia(`/user/${user.id}/profile-image/${user.image}`)
                    : undefined
                }
              ></Avatar>
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
    </div>
  );
};
export default EmployeeAutocomplete;

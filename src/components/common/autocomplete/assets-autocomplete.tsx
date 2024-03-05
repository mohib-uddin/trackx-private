"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import AssetsService from "@/services/assets/client/assets.service";

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

const AssetAutocomplete = <T extends FieldValues>({
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
  const { useFetchInfiniteAssets } = AssetsService();
  const {
    data: assetData,
    isLoading: isAssetLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchInfiniteAssets();
  const [, scrollerRef] = useInfiniteScroll({
    shouldUseLoader: true,
    hasMore: hasNextPage,
    onLoadMore: fetchNextPage,
  });
  const assets = React.useMemo(
    () => assetData?.pages.flatMap((page) => page.data),
    [assetData],
  );
  if (!assetData || !assets) {
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
      isLoading={isAssetLoading}
      defaultItems={assets}
      className="max-w-xs"
      onSelectionChange={(e) => {
        onChange(e);
      }}
    >
      {(asset) => (
        <AutocompleteItem key={asset.id} textValue={asset.name}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{asset.name}</span>
              <span className="text-tiny text-default-400">
                {asset.description}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
export default AssetAutocomplete;

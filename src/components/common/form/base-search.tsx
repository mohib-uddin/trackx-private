import { Input } from "@nextui-org/input";
import { SearchIcon } from "@nextui-org/shared-icons";
import React from "react";

interface Props {
  placeholder: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const BaseSearch = ({
  placeholder,
  searchQuery,
  setSearchQuery,
  setPage,
}: Props) => {
  const onSearchChange = (value: string) => {
    setSearchQuery(value);
    console.log(value);
    setPage(1);
  };
  const onClear = () => {
    setSearchQuery("");
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          size={"sm"}
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder={placeholder}
          startContent={<SearchIcon />}
          value={searchQuery}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default BaseSearch;

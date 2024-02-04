import { Button } from "@nextui-org/button";
import React from "react";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  extraClass?: string;
  type?: "button" | "submit";
  isLoading?: boolean;
}
export default function BaseButton({
  onClick,
  children,
  extraClass = "",
  type = "button",
  isLoading = false,
}: Props) {
  return (
    <Button
      onClick={onClick}
      type={type}
      radius="sm"
      isLoading={isLoading}
      className={`bg-primary text-white font-bold text-base md:text-lg 2xl:text-xl md:p-6 ${extraClass}`}
    >
      {children}
    </Button>
  );
}

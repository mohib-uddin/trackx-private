import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React, { useEffect } from "react";

interface Props {
  name: string | React.ReactNode;
  title: string;
  isIconButton?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action: any;
  handleSubmit?: any;
  openCallback?: () => void;
  type?: string;
  isLoading?: boolean;
  actionTitle?: string;
}

export default function BaseFormModal({
  title,
  children,
  action,
  openCallback,
  name,
  isIconButton = false,
  icon,
  handleSubmit,
  isLoading,
  type,
  actionTitle,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {type === "success" ? (
        <Button
          color="success"
          className={"text-white"}
          radius="full"
          size="sm"
          variant={"solid"}
          isLoading={isLoading}
          onPress={() => {
            if (openCallback) {
              openCallback();
            }
            onOpen();
          }}
        >
          APPROVE
        </Button>
      ) : (
        <Button
          color={"primary"}
          isIconOnly={isIconButton}
          onPress={() => {
            if (openCallback) {
              openCallback();
            }
            onOpen();
          }}
        >
          {isIconButton ? icon : name}
        </Button>
      )}

      <Modal
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 z-[100px]",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(action)}>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type={"submit"} color="primary">
                  {actionTitle ?? "Action"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

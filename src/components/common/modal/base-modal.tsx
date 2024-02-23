import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React from "react";

interface Props {
  isOpen: boolean;
  onOpenChange?: () => void;
  children: React.ReactNode;
  actionTitle: string;
  action?: () => void;
  title: string;
}

export default function BaseModal({
  isOpen,
  onOpenChange,
  children,
  title,
  actionTitle,
  action,
}: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                  }}
                >
                  {actionTitle}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

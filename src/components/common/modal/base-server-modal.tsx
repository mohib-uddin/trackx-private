"use client";
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
  title: string;
  children: React.ReactNode;
}

export default function BaseServerModal({ title, children }: Props) {
  return (
    <>
      <Modal defaultOpen={true}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}

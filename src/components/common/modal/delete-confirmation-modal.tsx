import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { DeleteIcon } from "@nextui-org/shared-icons";
import { Spinner } from "@nextui-org/spinner";

interface Props {
  deleteCallback: () => void;
  isLoading: boolean;
}

const DeleteConfirmationModal = ({ isLoading, deleteCallback }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color={"danger"} onPress={onOpen} isIconOnly={true}>
        <DeleteIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete?
              </ModalHeader>
              <ModalBody>
                <h2>Are You Sure You Want To Delete?</h2>
                <p>You {`Can't`} Undo This Action</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onClick={deleteCallback}
                  onPress={onClose}
                >
                  {!isLoading ? "Delete" : <Spinner />}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default DeleteConfirmationModal;

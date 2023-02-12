import { LoadingOverlay, Modal } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  title: string;
  isModalOpened: boolean;
  closeModal: () => void;
  loading: boolean;
  children: ReactNode;
};

export const ModalForm = ({
  title,
  isModalOpened,
  closeModal,
  loading,
  children,
}: Props) => {
  return (
    <Modal opened={isModalOpened} onClose={closeModal} title={title}>
      <LoadingOverlay visible={loading} overlayBlur={3} />

      {children}
    </Modal>
  );
};

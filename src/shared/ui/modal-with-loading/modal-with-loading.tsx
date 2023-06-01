import { LoadingOverlay, Modal, ModalProps } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
} & Omit<ModalProps, "children">;

export const ModalWithLoading = ({
  loading,
  children,
  ...modalProps
}: Props) => {
  return (
    <Modal {...modalProps}>
      <LoadingOverlay visible={loading} overlayBlur={3} />

      {children}
    </Modal>
  );
};

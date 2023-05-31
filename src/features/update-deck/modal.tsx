import { Modal as MantineModal } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
};

export const Modal = ({ children, opened, onClose }: Props) => {
  return (
    <MantineModal opened={opened} onClose={onClose} title="Update deck">
      {children}
    </MantineModal>
  );
};

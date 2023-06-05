import { Button, Group, Stack, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { deleteUserMutation } from "@/entities/user";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

export const DeleteUser = () => {
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);
  const { start: deleteUser, pending } = useUnit(deleteUserMutation);
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    deleteUser();
    navigate("/");
  };

  return (
    <>
      <Button onClick={openModalFn} color="red">
        Delete account
      </Button>

      <ModalWithLoading
        title="Delete account"
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
      >
        <form onSubmit={onSubmit}>
          <Stack>
            <Text>Are you sure you want to delete your account?</Text>

            <Group position="right">
              <Button onClick={closeModalFn}>No</Button>
              <Button type="submit">Yes</Button>
            </Group>
          </Stack>
        </form>
      </ModalWithLoading>
    </>
  );
};

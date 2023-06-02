import { Button } from "@mantine/core";
import { useUnit } from "effector-react";

import { LoginForm, UserLoginDto, updateUserMutation } from "@/entity/user";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";
import { $modalOpened, openModal, closeModal } from "./model";

type Props = {
  username: string;
};

export const UpdateUser = ({ username }: Props) => {
  const { start: startUpdateUser, pending } = useUnit(updateUserMutation);
  const [modalOpened, openModalFn, closeModalFn] = useUnit([
    $modalOpened,
    openModal,
    closeModal,
  ]);
  const submit = ({ body }: { body: UserLoginDto }) => startUpdateUser(body);

  return (
    <>
      <Button onClick={openModalFn}>Edit profile</Button>

      <ModalWithLoading
        title="Edit profile"
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
      >
        <LoginForm isUpdate={true} submit={submit} username={username} />
      </ModalWithLoading>
    </>
  );
};

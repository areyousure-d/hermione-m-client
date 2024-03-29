import { useUnit } from "effector-react";

import { LoginForm, updateUserMutation, UserLoginDto } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

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

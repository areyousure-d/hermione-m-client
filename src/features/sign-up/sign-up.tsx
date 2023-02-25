import { Button, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { SignUpForm, signUpMutation } from "@/entities/user";
import { $isAuthorized } from "@/shared/auth/token";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

export const SignUp = () => {
  const [
    signUpMutationFailed,
    modalOpened,
    openModalFn,
    closeModalFn,
    isAuthorized,
  ] = useUnit([
    signUpMutation.$failed,
    $modalOpened,
    openModal,
    closeModal,
    $isAuthorized,
  ]);

  const { start, pending } = useUnit(signUpMutation);

  if (isAuthorized) {
    return null;
  }

  return (
    <>
      <Button onClick={openModalFn}>Sign up</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Sign up"
      >
        {signUpMutationFailed && (
          <Text fz="md" color="red.7">
            Sign up error
          </Text>
        )}

        <SignUpForm submit={start} />
      </ModalWithLoading>
    </>
  );
};

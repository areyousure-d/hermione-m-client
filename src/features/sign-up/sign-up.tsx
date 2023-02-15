import { Button, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { SignUpForm } from "@/entities/user";
import { $isAuthorized } from "@/shared/auth/token";

import {
  $modalOpened,
  $signUpMutationFailed,
  closeModal,
  openModal,
  signUpMutation,
} from "./model";

export const SignUp = () => {
  const [
    signUpMutationFailed,
    modalOpened,
    openModalFn,
    closeModalFn,
    isAuthorized,
  ] = useUnit([
    $signUpMutationFailed,
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

      <Modal opened={modalOpened} onClose={closeModalFn} title="Sign up">
        <LoadingOverlay visible={pending} overlayBlur={3} />

        {signUpMutationFailed && (
          <Text fz="md" color="red.7">
            Sign up error
          </Text>
        )}

        <SignUpForm submit={start} />
      </Modal>
    </>
  );
};

import { Button, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { SignInForm } from "@/entities/user";
import { $isAuthorized, tokenErased } from "@/shared/auth/token";

import {
  $modalOpened,
  $signInMutationFailed,
  closeModal,
  openModal,
  signInMutation,
} from "./model";

export const SignIn = () => {
  const [
    isAuthorized,
    tokenErasedEvent,
    modalOpened,
    openModalFn,
    closeModalFn,
    signInMutationFailed,
  ] = useUnit([
    $isAuthorized,
    tokenErased,
    $modalOpened,
    openModal,
    closeModal,
    $signInMutationFailed,
  ]);

  const { start, pending: signInMutationPending } = useUnit(signInMutation);

  if (isAuthorized) {
    return <Button onClick={tokenErasedEvent}>Sign out</Button>;
  }

  return (
    <>
      <Button onClick={openModalFn}>Sign in</Button>

      <Modal opened={modalOpened} onClose={closeModalFn} title="Sign up">
        <LoadingOverlay visible={signInMutationPending} overlayBlur={3} />

        {signInMutationFailed && (
          <Text fz="md" color="red.7">
            Sign up error
          </Text>
        )}

        <SignInForm submit={start} />
      </Modal>
    </>
  );
};

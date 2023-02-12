import { Button, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { SignUpForm } from "@/entities/user";
import { $isAuthorized, tokenErased } from "@/shared/auth/token";

import {
  $isError,
  $isFormOpened,
  closeForm,
  openForm,
  signInFx,
  submitted,
} from "./model";

export const SignIn = () => {
  const [
    submit,
    pending,
    isError,
    isFormOpened,
    closeFormEvent,
    openFormEvent,
    isAuthorized,
    tokenErasedEvent,
  ] = useUnit([
    submitted,
    signInFx.pending,
    $isError,
    $isFormOpened,
    closeForm,
    openForm,
    $isAuthorized,
    tokenErased,
  ]);

  if (isAuthorized) {
    return <Button onClick={tokenErasedEvent}>Sign out</Button>;
  }

  return (
    <>
      <Button onClick={openFormEvent}>Sign in</Button>

      <Modal opened={isFormOpened} onClose={closeFormEvent} title="Sign up">
        <LoadingOverlay visible={pending} overlayBlur={3} />

        {isError && (
          <Text fz="md" color="red.7">
            Sign up error
          </Text>
        )}

        <SignUpForm submit={submit} />
      </Modal>
    </>
  );
};

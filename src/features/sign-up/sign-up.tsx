import { Button, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { SignUpForm } from "@/entities/user";
import { $isAuthorized } from "@/shared/auth/token";

import {
  $isError,
  $isFormOpened,
  closeForm,
  openForm,
  signUpFx,
} from "./model";

export const SignUp = () => {
  const [
    pending,
    isError,
    isFormOpened,
    closeFormEvent,
    openFormEvent,
    isAuthorized,
  ] = useUnit([
    signUpFx.pending,
    $isError,
    $isFormOpened,
    closeForm,
    openForm,
    $isAuthorized,
  ]);

  if (isAuthorized) {
    return null;
  }

  return (
    <>
      <Button onClick={openFormEvent}>Sign up</Button>

      <Modal opened={isFormOpened} onClose={closeFormEvent} title="Sign up">
        <LoadingOverlay visible={pending} overlayBlur={3} />

        {isError && (
          <Text fz="md" color="red.7">
            Sign up error
          </Text>
        )}

        <SignUpForm />
      </Modal>
    </>
  );
};

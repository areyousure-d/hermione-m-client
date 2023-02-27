import { Button, Text } from "@mantine/core";
import { useUnit } from "effector-react";

import { SignInForm, signInMutation } from "@/entities/user";
import { $isAuthorized, tokenErased } from "@/shared/auth/token";
import { ModalWithLoading } from "@/shared/ui/modal-with-loading";

import { $modalOpened, closeModal, openModal } from "./model";

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
    signInMutation.$failed,
  ]);

  const { start, pending } = useUnit(signInMutation);

  if (isAuthorized) {
    return <Button onClick={tokenErasedEvent}>Sign out</Button>;
  }

  return (
    <>
      <Button onClick={openModalFn}>Sign in</Button>

      <ModalWithLoading
        opened={modalOpened}
        onClose={closeModalFn}
        loading={pending}
        title="Sign in"
      >
        {signInMutationFailed && (
          <Text fz="md" color="red.7">
            Sign up error
          </Text>
        )}

        <SignInForm submit={start} />
      </ModalWithLoading>
    </>
  );
};

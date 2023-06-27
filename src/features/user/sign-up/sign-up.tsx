import { Box, LoadingOverlay, Title } from "@mantine/core";
import { useUnit } from "effector-react";

import { UserLoginDto } from "@/entities/user";
import { Alert } from "@/shared/ui/alert";
import { Link } from "@/shared/ui/link";

import { signUpMutation } from "./model";
import { SignUpForm } from "./sign-up-form";

export const SignUp = () => {
  const [signUpSuccess] = useUnit([signUpMutation.$succeeded]);
  const { start, pending } = useUnit(signUpMutation);

  const submit = ({ body }: { body: UserLoginDto }) => {
    start({ body });
  };

  if (signUpSuccess) {
    return (
      <Alert variant="success" title="Success">
        <div>
          Your account has been successfully created. You can now{" "}
          <Link to="/login">log in</Link> to the system.
        </div>
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: "320px", margin: "auto" }}>
      <Title mb="lg">Sign up</Title>
      <SignUpForm submit={submit} />
      <LoadingOverlay visible={pending} overlayBlur={3} />
    </Box>
  );
};

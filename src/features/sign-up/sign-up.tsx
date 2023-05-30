import { Box, LoadingOverlay } from "@mantine/core";
import { useUnit } from "effector-react";

import { signUpMutation, User } from "@/entity/user";
import { Link } from "@/shared/ui/link";

import { SignUpForm } from "./sign-up-form";

export const SignUp = () => {
  const [signUpSuccess] = useUnit([signUpMutation.$succeeded]);
  const { start, pending } = useUnit(signUpMutation);

  const submit = ({ body }: { body: User }) => {
    start({ body });
  };

  if (signUpSuccess) {
    return (
      <div>
        <div>Account successfully created</div>
        <div>
          <Link to="/login">login now</Link>
        </div>
      </div>
    );
  }

  return (
    <Box sx={{ width: "320px", margin: "auto" }}>
      <LoadingOverlay visible={pending} overlayBlur={3} />
      <SignUpForm submit={submit} />
    </Box>
  );
};

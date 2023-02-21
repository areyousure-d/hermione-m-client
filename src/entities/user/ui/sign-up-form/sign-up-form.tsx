import { Button, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { signUpFormSchema } from "../../lib";
import { User } from "../../model";

type SignUpFormErrors = {
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const initialFormData = { username: "", password: "", confirmPassword: "" };
const initialFormErrors: SignUpFormErrors = {
  username: null,
  password: null,
  confirmPassword: null,
};

type Props = {
  submit: ({ body }: { body: User }) => void;
};

export const SignUpForm = ({ submit }: Props) => {
  const [formValues, setFormValues] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors(initialFormErrors);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationResult = signUpFormSchema.safeParse(formValues);
    const isPasswordsEqual = formValues.password === formValues.confirmPassword;

    if (validationResult.success && isPasswordsEqual) {
      submit({ body: formValues });
      setFormValues(initialFormData);
      setFormErrors(initialFormErrors);
      return;
    }

    const errors: SignUpFormErrors = { ...initialFormErrors };

    if (!validationResult.success) {
      const issues = validationResult.error.issues;

      issues.forEach((issue) => {
        const name = issue.path[0];
        const message = issue.message;

        if (name in errors) {
          errors[name as keyof SignUpFormErrors] = message;
        }
      });
    }

    if (!isPasswordsEqual) {
      errors.confirmPassword =
        "Your password and confirmation password must match";
    }

    setFormErrors(errors);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          type="text"
          name="username"
          label="Username"
          placeholder="username"
          onChange={onChange}
          value={formValues.username}
          error={formErrors.username}
        />
        <TextInput
          type="password"
          name="password"
          label="Password"
          placeholder="password"
          onChange={onChange}
          value={formValues.password}
          error={formErrors.password}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          label="Confirm password"
          placeholder="password"
          onChange={onChange}
          value={formValues.confirmPassword}
          error={formErrors.confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </Stack>
    </form>
  );
};

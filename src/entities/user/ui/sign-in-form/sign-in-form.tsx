import { Button, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { signInFormSchema } from "../../lib";
import { User } from "../../model";

type SignInFormErrors = {
  username: string | null;
  password: string | null;
};

const initialFormData = { username: "", password: "" };
const initialFormErrors: SignInFormErrors = { username: null, password: null };

type Props = {
  submit: ({ body }: { body: User }) => void;
};

export const SignInForm = ({ submit }: Props) => {
  const [formValues, setFormValues] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors(initialFormErrors);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = signInFormSchema.safeParse(formValues);

    if (validationResult.success) {
      submit({ body: formValues });
      setFormValues(initialFormData);
      return;
    }

    const errors = { ...initialFormErrors };
    validationResult.error.issues.forEach((issue) => {
      const name = issue.path[0];
      const message = issue.message;

      if (name in errors) {
        errors[name as keyof SignInFormErrors] = message;
      }
    });

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

        <Button type="submit">Sign in</Button>
      </Stack>
    </form>
  );
};

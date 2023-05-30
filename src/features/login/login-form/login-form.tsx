import { Button, Group, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { User } from "@/entity/user";

import { loginFormSchema } from "./login-form.schema";

type LoginFormErrors = {
  username: string | null;
  password: string | null;
};

const initialFormValues = { username: "", password: "" };
const initialFormErrors: LoginFormErrors = { username: null, password: null };

type Props = {
  submit: ({ body }: { body: User }) => void;
};

export const LoginForm = ({ submit }: Props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const validationResult = loginFormSchema.safeParse(formValues);

    if (validationResult.success) {
      submit({ body: formValues });
      setFormValues(initialFormValues);
      return;
    }

    const errors = { ...initialFormErrors };
    validationResult.error.issues.forEach((issue) => {
      const name = issue.path[0];
      const message = issue.message;

      if (name && name in errors) {
        errors[name as keyof LoginFormErrors] = message;
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

        <Group position="right">
          <Button type="reset">Reset</Button>
          <Button type="submit">Login</Button>
        </Group>
      </Stack>
    </form>
  );
};

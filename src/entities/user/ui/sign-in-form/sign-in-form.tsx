import { Button, Stack, TextInput } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";

import { User } from "../../model";

const initialFormData = { username: "", password: "" };

type Props = {
  submit: (userData: User) => void;
};

export const SignInForm = ({ submit }: Props) => {
  const [userData, setUserData] = useState(initialFormData);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(userData);
    setUserData(initialFormData);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          type="text"
          name="username"
          label="username"
          placeholder="username"
          onChange={onChange}
          value={userData.username}
        />
        <TextInput
          type="password"
          name="password"
          label="password"
          placeholder="password"
          onChange={onChange}
          value={userData.password}
        />

        <Button type="submit">Sign in</Button>
      </Stack>
    </form>
  );
};

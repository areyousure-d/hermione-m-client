import { Button, Stack, TextInput } from "@mantine/core";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent, useState } from "react";

import { submitted } from "../../model";

const initialFormData = { username: "", password: "" };

export const SignUpForm = () => {
  const [userData, setUserData] = useState(initialFormData);
  const submittedEvent = useUnit(submitted);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submittedEvent(userData);
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

        <Button type="submit">Sign up</Button>
      </Stack>
    </form>
  );
};

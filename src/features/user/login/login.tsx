import { Box, LoadingOverlay, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "@/entities/user";
import { $isAuthorized } from "@/shared/auth/token";

import { loginMutation } from "./model";

export const Login = () => {
  const navigate = useNavigate();
  const [isAuthorized] = useUnit([$isAuthorized]);
  const { start, pending } = useUnit(loginMutation);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return (
    <Box sx={{ maxWidth: "320px", margin: "auto" }}>
      <Title mb="lg">Log in</Title>
      <LoginForm submit={start} />
      <LoadingOverlay visible={pending} overlayBlur={3} />
    </Box>
  );
};

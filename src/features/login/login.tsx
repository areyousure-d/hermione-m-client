import { Box, LoadingOverlay } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { $isAuthorized } from "@/shared/auth/token";

import { LoginForm } from "./login-form";
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
    <Box sx={{ width: "320px", margin: "auto" }}>
      <LoadingOverlay visible={pending} overlayBlur={3} />
      <LoginForm submit={start} />
    </Box>
  );
};
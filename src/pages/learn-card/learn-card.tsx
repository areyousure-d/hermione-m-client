import { Container, Title } from "@mantine/core";
import { useUnit } from "effector-react";

import { LearnCard } from "@/features/learn-card";
import { $isAuthorized } from "@/shared/auth/token";

export const LearnCardPage = () => {
  const isAuthorized = useUnit($isAuthorized);

  if (!isAuthorized) {
    return <Container>access denied</Container>;
  }

  return (
    <Container
      sx={{
        height:
          "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px) - 96px)",
      }}
    >
      <Title order={2} mb="lg" align="center">
        Learn
      </Title>

      <LearnCard />
    </Container>
  );
};

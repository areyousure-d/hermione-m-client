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
    <Container>
      <Title order={2}>Learn card</Title>

      <LearnCard />
    </Container>
  );
};

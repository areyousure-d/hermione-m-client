import { Container, Title } from "@mantine/core";

import { LearnCard } from "@/features/learn-card";

export const LearnCardPage = () => {
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

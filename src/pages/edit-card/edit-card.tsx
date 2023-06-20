import { Container, Title } from "@mantine/core";

import { EditCard } from "@/features/card/edit-card";

export const EditCardPage = () => {
  return (
    <Container>
      <Title order={2} mb="lg">
        Edit Card
      </Title>

      <EditCard />
    </Container>
  );
};

import { Container, Title } from "@mantine/core";

import { UpdateCard } from "@/features/card/update-card";

export const UpdateCardPage = () => {
  return (
    <Container>
      <Title order={2} mb="lg">
        Update Card
      </Title>

      <UpdateCard />
    </Container>
  );
};

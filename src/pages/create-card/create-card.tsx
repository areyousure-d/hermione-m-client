import { Container, Title } from "@mantine/core";

import { CreateCard } from "@/features/card/create-card";

export const CreateCardPage = () => {
  return (
    <Container>
      <Title order={2} mb="lg">
        Create Card
      </Title>

      <CreateCard />
    </Container>
  );
};

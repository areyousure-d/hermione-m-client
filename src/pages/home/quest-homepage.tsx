import { Box, Center, Container, Group, Text, Title } from "@mantine/core";

import { ButtonLink } from "@/shared/ui/button-link";

export const GuestHomepage = () => {
  return (
    <Container>
      <Center mt="15%">
        <Box>
          <Title align="center" mb="md">
            Hermione-m
          </Title>
          <Text mb="xl" align="center">
            Minimalistic application for spaced repetitions.
          </Text>
          <Group position="center">
            <ButtonLink to="/login">Log in</ButtonLink>
          </Group>
        </Box>
      </Center>
    </Container>
  );
};

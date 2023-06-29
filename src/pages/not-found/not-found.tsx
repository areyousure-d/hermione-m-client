import { Box, Center, Container, Group, Text, Title } from "@mantine/core";

import { ButtonLink } from "@/shared/ui/button-link";

export const NotFoundPage = () => {
  return (
    <Container>
      <Center mt="15%">
        <Box>
          <Title align="center" mb="md">
            404
          </Title>
          <Text mb="xl" align="center">
            This page could not be found
          </Text>
          <Group position="center">
            <ButtonLink to="/">Home page</ButtonLink>
          </Group>
        </Box>
      </Center>
    </Container>
  );
};

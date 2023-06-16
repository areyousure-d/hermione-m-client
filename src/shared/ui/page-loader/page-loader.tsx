import { Center, Container, Loader } from "@mantine/core";

export const PageLoader = () => {
  return (
    <Container>
      <Center>
        <Loader variant="bars" mt="lg" height={400} />
      </Center>
    </Container>
  );
};

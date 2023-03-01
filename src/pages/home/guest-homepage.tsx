import { Container, Text, Title } from "@mantine/core";

export const GuestHomepage = () => {
  return (
    <Container>
      <Title order={1} mb="lg" align="center">
        Hermione-m
      </Title>
      <Text align="center">
        Hermione-m is an upcoming platform designed to help users learn and
        remember information quickly and effectively. Our interval repetition
        system works by having users review material at spaced intervals in
        order to better store information in their long-term memory. Currently,
        the site is in demo mode, but users can still get a taste of the full
        functionality of the site once it is launched. With advanced algorithms
        and custom reminders and notifications, users can maximize the
        efficiency of their learning and take their knowledge retention to the
        next level.
      </Text>
    </Container>
  );
};

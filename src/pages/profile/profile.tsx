import { Box, Button, Container, Group, Stack, Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useEffect } from "react";

import { userQuery } from "@/entity/user";
import { UpdateUser } from "@/features/user/update-user";
import { formatDate } from "@/shared/lib/format-date";

export const ProfilePage = () => {
  const { start: startUserQuery, pending, data: user } = useUnit(userQuery);

  useEffect(() => {
    startUserQuery();
  }, [startUserQuery]);

  if (pending) {
    return <Container>Loading...</Container>;
  }

  if (!user) {
    return <Container>Error fetch profile</Container>;
  }

  const formattedCreatedAt = formatDate(user.createdAt);
  const formattedUpdatedAt = formatDate(user.updatedAt);

  return (
    <Container>
      <Stack>
        <Group position="apart">
          <Title>{user.username}</Title>

          <Group>
            <UpdateUser username={user.username} />
            <Button>Delete</Button>
          </Group>
        </Group>

        <Box>Created: {formattedCreatedAt}</Box>
        <Box>Updated: {formattedUpdatedAt}</Box>
      </Stack>
    </Container>
  );
};

import { Container, Text } from "@mantine/core";
import { useUnit } from "effector-react";
import { ReactNode } from "react";

import { $isAuthorized } from "@/shared/auth/token";
import { Alert } from "@/shared/ui/alert";

type Props = {
  children: ReactNode;
};

export const UserAuth = ({ children }: Props) => {
  const [isAuthorized] = useUnit([$isAuthorized]);

  if (!isAuthorized) {
    return (
      <Container>
        <Alert variant="error" title={<Text fz="lg">Access denied</Text>}>
          <Text fz="lg">You are not logged in</Text>
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

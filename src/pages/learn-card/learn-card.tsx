import { Title } from "@mantine/core";
import { useUnit } from "effector-react";

import { LearnCard } from "@/features/learn-card";
import { $isAuthorized } from "@/shared/auth/token";

export const LearnCardPage = () => {
  const isAuthorized = useUnit($isAuthorized);

  if (!isAuthorized) {
    return <div>access denied</div>;
  }

  return (
    <div>
      <Title order={2}>Learn card</Title>

      <LearnCard />
    </div>
  );
};

import { Title } from "@mantine/core";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";

import { CreateCard } from "@/features/create-card";
import { $isAuthorized } from "@/shared/auth/token";

export const CreateCardPage = () => {
  const { deckId } = useParams() as { deckId: string };
  const [isAuthorized] = useUnit([$isAuthorized]);

  if (!isAuthorized) {
    return <div>access denied</div>;
  }

  return (
    <>
      <Title order={2}>create card page</Title>

      <CreateCard deckId={deckId} />
    </>
  );
};

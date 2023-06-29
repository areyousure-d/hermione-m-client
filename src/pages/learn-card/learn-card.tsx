import { Container } from "@mantine/core";

import { LearnCard } from "@/features/card/learn-card";
import { ButtonLink } from "@/shared/ui/button-link";
import { Icon } from "@/shared/ui/icon";

export const LearnCardPage = () => {
  return (
    <Container>
      <ButtonLink
        to="/"
        leftIcon={
          <Icon type="common" name="arrow-left" width={20} height={20} />
        }
        mb="lg"
      >
        Back to home
      </ButtonLink>

      <LearnCard />
    </Container>
  );
};

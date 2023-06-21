import { Container } from "@mantine/core";

import { LearnCard } from "@/features/card/learn-card";
import { ButtonLink } from "@/shared/ui/button-link";
import { Icon } from "@/shared/ui/icon";

export const LearnCardPage = () => {
  return (
    <Container>
      <ButtonLink
        to="/"
        variant="light"
        leftIcon={
          <Icon type="common" name="arrow-left" width={20} height={20} />
        }
        mb="lg"
      >
        To deck list
      </ButtonLink>

      <LearnCard />
    </Container>
  );
};

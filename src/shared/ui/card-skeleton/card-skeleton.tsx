import { Skeleton } from "@mantine/core";

type Props = {
  cardsNumber: number;
};

export const CardSkeleton = ({ cardsNumber }: Props) => (
  <>
    {Array.from({ length: cardsNumber }).map((_, i) => (
      <Skeleton
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        visible={true}
        height={200}
        data-testid="card-skeleton"
      />
    ))}
  </>
);

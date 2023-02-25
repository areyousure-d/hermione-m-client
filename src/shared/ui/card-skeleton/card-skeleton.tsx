import { Skeleton } from "@mantine/core";

type Props = {
  cardNumber: number;
};

export const CardSkeleton = ({ cardNumber }: Props) => {
  return (
    <>
      {Array.from({ length: cardNumber }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={index} visible={true} height={200} />
      ))}
    </>
  );
};

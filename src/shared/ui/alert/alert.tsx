import { Alert as MantineAlert } from "@mantine/core";
import { IconExclamationCircle, IconInfoCircle } from "@tabler/icons";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  variant: "error" | "info";
};

export const Alert = ({ children, title, variant }: Props) => {
  if (variant === "error") {
    return (
      <MantineAlert
        title={title}
        icon={<IconExclamationCircle size={22} />}
        color="red"
      >
        {children}
      </MantineAlert>
    );
  }

  return (
    <MantineAlert
      title={title}
      icon={<IconInfoCircle size={22} />}
      color="yellow"
    >
      {children}
    </MantineAlert>
  );
};

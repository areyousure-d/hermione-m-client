import { Alert as MantineAlert } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: ReactNode;
  variant: "error" | "info" | "success" | "warning";
};

const getColor = (variant: Props["variant"]) => {
  switch (variant) {
    case "error":
      return "red";
    case "info":
      return "blue";
    case "success":
      return "green";
    case "warning":
      return "yellow";
    default:
      return "blue";
  }
};

export const Alert = ({ children, title, variant }: Props) => {
  return (
    <MantineAlert title={title} color={getColor(variant)}>
      {children}
    </MantineAlert>
  );
};

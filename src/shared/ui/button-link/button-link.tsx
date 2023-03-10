import { Button, ButtonProps } from "@mantine/core";
import { Link, LinkProps } from "react-router-dom";

type Props = ButtonProps & Omit<LinkProps, "type">;

export const ButtonLink = (props: Props) => {
  return <Button component={Link} {...props} />;
};

import { Button, ButtonProps } from "@mantine/core";
import { Link, LinkProps } from "react-router-dom";

type Props = Omit<ButtonProps, "component"> & Omit<LinkProps, "type">;

export const ButtonLink = (props: Props) => {
  return <Button component={Link} fw="500" variant="light" {...props} />;
};

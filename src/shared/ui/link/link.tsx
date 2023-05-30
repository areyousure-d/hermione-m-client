import { Anchor } from "@mantine/core";
import { Link as RouterLink, LinkProps } from "react-router-dom";

export const Link = (props: LinkProps) => {
  return <Anchor component={RouterLink} {...props} />;
};

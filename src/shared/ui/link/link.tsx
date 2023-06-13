import { Anchor, AnchorProps } from "@mantine/core";
import { Link as RouterLink, LinkProps } from "react-router-dom";

export const Link = (props: LinkProps & AnchorProps) => {
  return <Anchor component={RouterLink} {...props} />;
};

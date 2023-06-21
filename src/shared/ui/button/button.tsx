import { Button as MantineButton, ButtonProps } from "@mantine/core";
import { HtmlHTMLAttributes } from "react";

export const Button = (
  props: ButtonProps & HtmlHTMLAttributes<HTMLButtonElement>
) => {
  return <MantineButton fw="500" variant="light" {...props} />;
};

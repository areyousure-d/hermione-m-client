import {
  Box,
  Burger,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header as MantineHeader,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { SignIn } from "@/features/sign-in";
import { SignUp } from "@/features/sign-up";
import { ToggleTheme } from "@/features/toggle-theme";
import { Link } from "@/shared/ui/link";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const Header = () => {
  const { classes, theme } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <MantineHeader height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link to="/">hermione-m</Link>

          <Group>
            <ToggleTheme />

            <Group className={classes.hiddenMobile}>
              <SignIn />
              <SignUp />
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Group>
      </MantineHeader>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Menu"
        className={classes.hiddenDesktop}
        zIndex={100}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <SignIn />
            <SignUp />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

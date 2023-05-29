import {
  Box,
  Burger,
  Button,
  createStyles,
  Drawer,
  Group,
  Header as MantineHeader,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

import { ToggleTheme } from "@/features/toggle-theme";

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
  const { classes } = useStyles();
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
              <Button>login</Button>
              <Button>sign in</Button>
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
        title="Menu"
        className={classes.hiddenDesktop}
        zIndex={100}
      >
        <ScrollArea sx={{ height: "calc(100vh - 6em)" }} mx="md">
          <Group position="center" grow pb="xl" px="md">
            <Button>login in</Button>
            <Button>sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

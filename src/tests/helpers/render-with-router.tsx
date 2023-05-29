import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { Routing } from "@/pages";

export const renderWithRouter = ({
  component,
  initialRoute,
}: {
  component: ReactNode;
  initialRoute: string;
}) => {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routing />
      {component}
    </MemoryRouter>
  );
};

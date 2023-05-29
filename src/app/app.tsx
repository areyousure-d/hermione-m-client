import { Routing } from "@/pages";
import { BasicLayout } from "@/shared/ui/basic-layout";
import { Header } from "@/widgets/header";

import { Providers } from "./providers";

export const App = () => {
  return (
    <Providers>
      <BasicLayout header={<Header />}>
        <Routing />
      </BasicLayout>
    </Providers>
  );
};

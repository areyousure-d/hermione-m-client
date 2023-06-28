import { useEffect } from "react";

import { Routing } from "@/pages";
import { checkTokenInLs } from "@/shared/auth/token";
import { BasicLayout } from "@/shared/ui/basic-layout";
import { Header } from "@/widgets/header";

import { Providers } from "./providers";

export const App = () => {
  useEffect(() => {
    checkTokenInLs();
  }, []);

  return (
    <Providers>
      <BasicLayout header={<Header />}>
        <Routing />
      </BasicLayout>
    </Providers>
  );
};

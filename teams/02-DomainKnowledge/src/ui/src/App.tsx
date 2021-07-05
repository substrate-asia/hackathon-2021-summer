import * as React from "react";
import { Theme } from "@component/Theme";
import * as Store from "@store";
import { createLogger } from "@util/logger";
import { Routes } from "@route/index";

const log = createLogger("App");

type Props = {
  store: Store.t
}

export const App = ({ store }: Props) => {
  log("mount App");

  return (
    <React.StrictMode>
      <Store.Context.Provider value={store}>
        <Theme>
          <Routes />
        </Theme>
      </Store.Context.Provider>
    </React.StrictMode>
  );
};

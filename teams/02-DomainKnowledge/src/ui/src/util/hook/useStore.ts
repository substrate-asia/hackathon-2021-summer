import * as React from "react";
import * as Store from "@store";

export function useStore(): Store.t {
  const store = React.useContext(Store.Context);

  return store;
}

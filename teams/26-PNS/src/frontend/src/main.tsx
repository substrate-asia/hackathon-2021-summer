import ReactDOM from "react-dom";
import React from "react";

import { parseRoutePath } from "@worktools/ruled-router";

import { routerRules } from "./models/router-rules";
import { RexProvider } from "@jimengio/rex";

import _Container from "./pages/container";
import { globalStore } from "models/store";

/** dirty trick to make sure always using updated reference */
let Container = _Container;

const renderApp = () => {
  let routerTree = parseRoutePath(window.location.hash.slice(1), routerRules);

  ReactDOM.render(
    <RexProvider value={globalStore}>
      <Container router={routerTree as any} />{" "}
    </RexProvider>,
    document.querySelector(".app")
  );
};

export let main = () => {
  renderApp();
  window.addEventListener("hashchange", () => {
    renderApp();
  });
};

window.addEventListener("load", () => {
  main();
});

if ((import.meta as any).hot) {
  (import.meta as any).hot.accept("./pages/container", (newModule: any) => {
    // console.log("new:", newModule);
    Container = newModule.default;
    renderApp();
  });
}

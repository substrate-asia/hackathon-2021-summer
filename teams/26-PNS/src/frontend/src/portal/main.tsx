import ReactDOM from "react-dom";
import React from "react";

import { parseRoutePath } from "@worktools/ruled-router";

import { RexProvider } from "@jimengio/rex";

import _Container from "./pages/portal-container";

/** dirty trick to make sure always using updated reference */
let Container = _Container;

const renderApp = () => {
  ReactDOM.render(<Container />, document.querySelector(".app"));
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
  (import.meta as any).hot.accept("./pages/portal-container", (newModule: any) => {
    // console.log("new:", newModule);
    Container = newModule.default;
    renderApp();
  });
}

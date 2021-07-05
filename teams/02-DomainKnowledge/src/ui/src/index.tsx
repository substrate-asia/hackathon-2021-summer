import * as React from "react";
import { render } from "react-dom";
import * as Store from "@store";
import "focus-visible";

import { App } from "./App";

Store.initialize().then((store) => {
  render(<App store={store} />, document.getElementById("root"));
}).catch((e) => {
  const errorNotification = (
    <div>
      <h1> Failed to load APP </h1>
      <p> { e.toString() } </p>
    </div>
  )
  render(errorNotification, document.getElementById("root"));
})

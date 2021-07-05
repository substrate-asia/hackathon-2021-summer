import * as React from "react";
import { Home } from "@scene/Home";
import { NewDraft } from "@scene/NewDraft"
import { Switch, Link, Route } from "wouter";

export const Routes = () => {
  return (
    <div>
      <Link href="/"> Home </Link>
      <Link href="/draft/new"> New Draft </Link>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/draft/new" component={NewDraft} />
        <Route path="/about">About Us</Route>
        <Route path="/users/:name">
          {(params: { name: string }) => <div>Hello, {params.name}!</div>}
        </Route>
        <Route>404, Not Found!</Route>
      </Switch>
    </div>
  );
};

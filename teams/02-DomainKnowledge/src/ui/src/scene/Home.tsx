import * as React from "react";
import { DateTime } from "luxon";
import { observer } from "mobx-react-lite";
import * as Store from "@store";

export const Home = observer(() => {
  const store = Store.useStore();
  const { knowledgeMap } = store.knowledgeStore;

  const knowledgeList = Object.entries(knowledgeMap).map(([cid, knowledge]) => {
    return (
      <div key={cid}>
        <h3> {knowledge.title} </h3>
        <p> {knowledge.content} </p>
        <p> created at {knowledge.createdAt} </p>
        <p> updated at {knowledge.updatedAt} </p>
      </div>
    )
  })

  return (
    <div>
      <h1> home </h1>
      { knowledgeList }
    </div>
  );
});

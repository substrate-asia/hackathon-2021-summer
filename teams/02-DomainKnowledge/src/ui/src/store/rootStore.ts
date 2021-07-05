import * as React from "react";
import { makeAutoObservable } from "mobx";
import * as UserStore from "@store/UserStore";
import * as UiStore from "@store/UiStore";
import * as DbStore from "@store/DbStore";
import * as EditStore from "@store/EditStore";
import * as KnowledgeStore from "@store/KnowledgeStore";
import { createLogger } from "@util/logger";

const log = createLogger("store:IpfsNodeStore");

type Store = {
  userStore: UserStore.t;
  uiStore: UiStore.t;
  dbStore: DbStore.t;
  editStore: EditStore.t;
  knowledgeStore: KnowledgeStore.t;
};

export async function initialize(): Promise<Store> {
  log("initialize store");

  const dbStore = await DbStore.initialize();
  const knowledgeStore = await KnowledgeStore.initialize(dbStore);
  const uiStore = UiStore.initialize();
  const userStore = await UserStore.initialize(dbStore);
  const editStore = EditStore.initialize();

  return makeAutoObservable({
    userStore,
    uiStore,
    dbStore,
    editStore,
    knowledgeStore,
  })
}

export function useStore() {
  return React.useContext(Context)
}

export const Context: React.Context<Store> = React.createContext(undefined);

export type t = Store;

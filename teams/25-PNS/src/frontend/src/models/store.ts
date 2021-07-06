import { createStore } from "@jimengio/rex";

export interface IGlobalStore {
  userData: any; // TODO
}

export let initialStore: IGlobalStore = {
  userData: null as any,
};

export let globalStore = createStore<IGlobalStore>(initialStore);

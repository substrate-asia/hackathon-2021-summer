import { globalStore } from "models/store";

export let setAccountData = (data: any) => {
  globalStore.update((s) => {
    s.userData = data;
  });
};

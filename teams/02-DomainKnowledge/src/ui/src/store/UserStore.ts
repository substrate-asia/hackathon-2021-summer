import { DateTime } from "luxon";
import { Observable } from "rxjs";
import { action, runInAction } from "mobx";
import * as User from "@model/User";
import * as Store from "@store";

type UserMap = {
  [key: string]: User.t,
}

type UserStore = {
  currentUser: User.t,
  userMap: UserMap,
}

export async function initialize(dbStore: Store.DbStore.t): Promise<UserStore> {
  const currentId = (await Store.DbStore.getCurrentId(dbStore)).toString();

  // TODO: real current user
  const currentUser: User.t = {
    id: currentId,
    name: "Chutian Yang",
    email: "yct21@12tcy.com",
    lastActiveAt: DateTime.local(2021, 7, 4, 0, 21),
    createdAt: DateTime.local(2021, 6, 6, 12, 0),
  }

  const userMap = {
    [currentId]: currentUser,
  }

  return {
    currentUser,
    userMap,
  }
}

// export const login = (store: Store.t, userName: string, password: string) => {
//   let { client } = store.ipfsClientStore;
//   return new Observable((subscriber) => {});
//   // store.userStore = {
//   //   loggedIn: true,
//   //   appUser: user,
//   // };
// };

// export const logout = action((store: Store.t) => {
//   store.userStore = {
//     loggedIn: false,
//   };
// });

export type t = UserStore;

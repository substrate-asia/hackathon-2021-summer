import { makeAutoObservable } from "mobx";
import { DateTime } from "luxon";

type User = {
  id: string;
  name: string;
  email: string;
  lastActiveAt: DateTime;
  createdAt: DateTime;
};

export function create(user: User): User {
  return makeAutoObservable({
    ...user,
  });
}

export type t = User;

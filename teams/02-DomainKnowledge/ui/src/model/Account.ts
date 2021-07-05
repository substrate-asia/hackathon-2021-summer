import { Observable, Subscriber } from "rxjs";
import * as User from "@model/User";

type Account = {
  userName: string;
  password: string;
};

type LoginResult = {};

export function login(account: Account): Observable<User.t> {
  return new Observable((subscriber) => {});
}

export type t = Account;

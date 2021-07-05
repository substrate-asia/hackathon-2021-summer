import { DateTime } from "luxon";
import * as User from "@model/User";

type Knowledge = {
  isPublished: boolean,
  author: User.t,
  title: string,
  content: string,
  next?: Knowledge, // knowledge is stored as a link list
  createdAt: string,
  updatedAt: string,
};

/// Representation of knowledge in IPFS
export type Dag = Knowledge & { next: Knowledge }

export type t = Knowledge;

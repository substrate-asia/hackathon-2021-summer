import * as Knowledge from "@model/Knowledge";
import * as Store from "@store"

export type KnowledgeMap = {
  [key: string]: Knowledge.t,
}

type KnowledgeStore = {
  knowledgeMap: KnowledgeMap,
}

export async function initialize(dbStore: Store.DbStore.t): Promise<KnowledgeStore> {
  const knowledgeMap = await Store.DbStore.readKnowledges(dbStore);

  return {
    knowledgeMap,
  }
}

export type t = KnowledgeStore

import { runInAction, action } from "mobx";
import invariant from 'invariant'
import { DateTime } from "luxon";
import * as Store from "@store";
import { createLogger } from "@util/logger";

const log = createLogger("store:EditStore");

type EditStore = {
  status: 'not-editing',
} | {
  status: 'editing' | 'submitting',
  newDocument: true,
  title: string,
  content: string,
} | {
  status: 'editing' | 'submitting',
  newDocument: false,
  title: string,
  documentId: string,
  content: string,
}

export function initialize(): EditStore {
  return {
    status: 'not-editing',
  }
}

export const startEditing = action((store: Store.t, newDocument: boolean) => {
  store.editStore = {
    status: 'editing',
    newDocument: true, // edit
    title: '',
    content: '',
  }
})

export const setTitle = action((store: Store.t, title: string) => {
  if (store.editStore.status === 'editing') {
    store.editStore.title = title
  }
})

export const setContent = action((store: Store.t, content: string) => {
  if (store.editStore.status === 'editing') {
    store.editStore.content = content
  }
})

export async function createDraft(store: Store.t) {
  log("create draft")

  if (store.editStore.status === 'editing' && store.editStore.newDocument) {
    const knowledge = {
      isPublished: false,
      author: store.userStore.currentUser,
      title: store.editStore.title,
      content: store.editStore.content,
      createdAt: DateTime.now().toISO(),
      updatedAt: DateTime.now().toISO(),
    }

    runInAction(async () => {
      const cid = await Store.DbStore.insertKnowledge(store, knowledge);
      store.knowledgeStore.knowledgeMap[cid.bytes.toString()] = knowledge;
      alert(`Knowledge created with CID ${cid.bytes.toString()}`)
    })
  } else {
    log('Failed to creating draft')
    invariant(store.editStore.status === 'editing', "User is not editing")
    invariant(store.editStore.newDocument, "This is not a new document");
  }
}

export type t = EditStore;

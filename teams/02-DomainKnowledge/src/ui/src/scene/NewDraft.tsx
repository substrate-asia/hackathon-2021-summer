import * as React from "react";
import { observer } from "mobx-react-lite";
import * as Store from "@store";
import { createLogger } from "@util/logger";

const log = createLogger('scene:NewDraft');

export const NewDraft = observer(() => {
  log('render NewDraft component')
  const store = Store.useStore();
  let content;
  let title;

  if (store.editStore.status === 'not-editing') {
    Store.EditStore.startEditing(store, true);
    content = ''
    title = ''
  } else {
    content = store.editStore.content
    title = store.editStore.title
  }

  const onChangeTitle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    Store.EditStore.setTitle(store, ev.target.value);
  }

  const onChangeContent = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    Store.EditStore.setContent(store, ev.target.value);
  }

  const submitButtonDisabled = store.editStore.status === 'submitting';

  return (
    <div>
      <h1> New Draft </h1>
      <input value={ title } onChange={onChangeTitle} />
      <textarea value={content} onChange={onChangeContent} />
      <button
        disabled={submitButtonDisabled}
        onClick={(_) => Store.EditStore.createDraft(store)}
      > Submit </button>
    </div>
  )
})

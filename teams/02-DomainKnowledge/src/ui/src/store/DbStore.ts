import Ipfs from "ipfs";
// import { runInAction } from "mobx"; TODO: remove this?
import toBuffer from "it-to-buffer";
import * as Store from "@store";
import * as Knowledge from "@model/Knowledge"
import { createLogger } from "@util/logger";
import { DEFAULT_SWARM_ADDRESS, KNOWLEDGE_PATH, KNOWLEDGE_KNOWLEDGE_START_NODE_PATH } from '@util/constant'
import { Option, some, none } from '@util/type'

const log = createLogger("store:dbstore");

type Node = Ipfs.IPFS;

type DbStore =
  {
    node: Node;
  }

async function findKnowledgeStartNode(node: Node): Promise<Option<Uint8Array>> {
  try {
    log('read start node');
    const bufferedContents = await toBuffer(node.files.read(KNOWLEDGE_KNOWLEDGE_START_NODE_PATH));
    console.log(bufferedContents)
    log(`start node ${bufferedContents.toString()}`)

    return some(bufferedContents)
  } catch (e) {
    log('start node does not exist');

    return none()
  }
}

/// Read all knowledges from IPFS
export async function readKnowledges(dbStore: DbStore): Promise<Store.KnowledgeStore.KnowledgeMap> {
  const { node } = dbStore
  let knowledgeMap: Store.KnowledgeStore.KnowledgeMap = {};
  const findStartNodeResult = await findKnowledgeStartNode(node);

  if (findStartNodeResult.isSome) {
    log(`we have some cid ${findStartNodeResult.content}`)
    let currentCid = new Ipfs.CID(findStartNodeResult.content);
    log(`cid parsed ${currentCid}`)
    let currentKnowledge = (await node.dag.get(currentCid)).value;
    log(`get knowledge for ${currentCid}`)
    knowledgeMap[currentCid.toString()] = currentKnowledge;

    while (currentKnowledge.next) {
      currentKnowledge = currentKnowledge.next;
      knowledgeMap[currentKnowledge.next] = currentKnowledge;
    }
  }

  return knowledgeMap
}

export async function getCurrentId(dbStore: DbStore) {
  const { node } = dbStore;

  return await node.id()
}

export async function insertKnowledge(store: Store.t, knowledge: Knowledge.t) {
  const { node } = store.dbStore;

  const findStartNodeResult = await findKnowledgeStartNode(node);
  if (findStartNodeResult.isSome) {
    let firstNodeCid = new Ipfs.CID(findStartNodeResult.content);
    let firstKnowledge = (await node.dag.get(firstNodeCid)).value;
    knowledge.next = firstKnowledge;
  }

  log("Insert knowledge into IPFS")
  const cid = await node.dag.put(knowledge);
  log(`Knowledge inserted with CID: ${cid}`)

  node.files.write(
    KNOWLEDGE_KNOWLEDGE_START_NODE_PATH,
    cid.bytes,
    { create: true, pin: true },
  )

  return cid;
}

export async function initialize(): Promise<DbStore> {
  log("load ipfs")

  const node = await Ipfs.create({
    repo: "./domain-knowledge",
    start: false,
    preload: {
      enabled: false
    },
    config: {
      Addresses: {
        Swarm: DEFAULT_SWARM_ADDRESS,
      },
    }
  });

  await node.files.mkdir(KNOWLEDGE_PATH, { parents: true })

  return { node }
}

export type t = DbStore;

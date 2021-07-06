/// <reference path="./typings.d.ts" />

import { ethers } from "ethers";
import { Signer, BigNumber } from "ethers";
import { keccak_256 } from "js-sha3";
import { keccak_256 as sha3 } from "js-sha3";

import { Buffer as Buffer } from "buffer/";
import { HexAddress, DomainString, ContentType } from "./types";

import { EnsAbi, RegistrarAbi, ResolverAbi, ETHRegistrarControllerAbi, BulkRenewalAbi } from "./contracts";

import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Provider, JsonRpcSigner } from "@ethersproject/providers";
import { default as domainChecker } from "is-valid-domain";

export function getNamehash(name: string): HexAddress {
  let node = "";
  for (let i = 0; i < 32; i++) {
    node += "00";
  }

  if (name) {
    let labels = name.split(".");

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha = keccak_256(labels[i]);
      node = keccak_256(Buffer.from(node + labelSha, "hex"));
    }
  }

  return "0x" + node;
}

export function getLabelhash(rawlabel: string): HexAddress {
  if (rawlabel === "[root]") {
    return "";
  }

  return rawlabel.startsWith("[") && rawlabel.endsWith("]") && rawlabel.length === 66 ? "0x" + decodeLabelhash(rawlabel) : "0x" + sha3(rawlabel);
}

export function encodeLabelhash(hash: string): string {
  if (!hash.startsWith("0x")) {
    throw new Error("Expected label hash to start with 0x");
  }

  if (hash.length !== 66) {
    throw new Error("Expected label hash to have a length of 66");
  }

  return `[${hash.slice(2)}]`;
}

export function decodeLabelhash(hash: string): string {
  if (!(hash.startsWith("[") && hash.endsWith("]") && hash.length === 66)) {
    throw Error("Expected encoded labelhash to start and end with square brackets");
  }
  return `${hash.slice(1, -1)}`;
}

export const stripHexPrefix = (str: HexAddress): string => {
  return str.slice(0, 2) === "0x" ? str.slice(2) : str;
};

function checksummedHexDecoder(data: HexAddress): Buffer {
  const stripped = stripHexPrefix(data);
  return Buffer.from(stripHexPrefix(stripped), "hex");
}

export const toChecksumAddress = (address: HexAddress): HexAddress => {
  if (typeof address !== "string") {
    throw new Error("stripHexPrefix param must be type 'string', is currently type " + typeof address + ".");
  }
  const strip_address = stripHexPrefix(address).toLowerCase();
  const keccak_hash = keccak_256(strip_address).toString();
  // const keccak_hash = keccak_256(strip_address).toString('hex')
  let output = "0x";

  for (let i = 0; i < strip_address.length; i++) output += parseInt(keccak_hash[i], 16) >= 8 ? strip_address[i].toUpperCase() : strip_address[i];
  return output;
};

function getBufferedPrice(price: BigNumber): BigNumber {
  return price.mul(110).div(100);
}

const emptyAddress = "0x0000000000000000000000000000000000000000";
const emptyNode = "0x0000000000000000000000000000000000000000000000000000000000000000";
const resolverLabel = "0x" + sha3("resolver");
const resolverNode = getNamehash("resolver");
const nonode = "0x0000000000000000000000000000000000000000000000000000000000001234";
const tld = "eth";
const DAYS = 24 * 60 * 60;
const secret = "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF";
const INFURA_URL = "https://rinkeby.infura.io/v3/a927dc26eb014ee29eeef68dab3ad53b";
const api_url_base = "https://pns-engine.vercel.app/api/handler";

let provider: Web3Provider;
/** TODO, extracted from JsonRpcSigner */
let signer: any;

let account: string;

/** TODO from contract */
let ens: any;
/** TODO from contract */
let resolver: any;
/** TODO from contract */
let registrar: any;
/** TODO from contract */
let controller: any;

let ensAddr: string;
let resolverAddr: string;

export const ContractAddrs = {
  ens: "0xaf5B6573ADBE5126FB2fc5e60FB7964b1c225dF9",
  resolver: "0x2E6fd6dea05781226c1305e21e7caC760872a0AD",
  registrar: "0xd8E43a8e84C60558aEB3d9fa270b66dc9A17b252",
  controller: "0x34Ef2EAeA4E7b8F6e8D629b2AdaEe8d1Fb641655",
};

const isNode = new Function("try {return this===global;}catch(e){return false;}");

export async function setProvider() {
  if (typeof (window as any).ethereum !== "undefined") {
    // 调用窗口, 登录账户
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider((window as any).ethereum) as Web3Provider;
    signer = await provider.getSigner();
    account = await signer.getAddress();
  } else {
    console.log("cannot find a global `ethereum` object");
    provider = new ethers.providers.JsonRpcProvider(INFURA_URL) as Web3Provider;
    signer = null;
    account = "0x0";
  }

  console.log(provider, signer, account);
  return;
}

/** 设置ens并初始化 */
export async function setup(ensAddress?: string, resolverAddress?: string, registrarAddress?: string, controllerAddress?: string) {
  if (provider) {
    return {
      provider,
      signer,
      ens,
      resolver,
      registrar,
      controller,
    };
  }

  await setProvider();
  console.log("init sdk");

  ensAddress = ensAddress || ContractAddrs.ens;
  resolverAddress = resolverAddress || ContractAddrs.resolver;
  registrarAddress = registrarAddress || ContractAddrs.registrar;
  controllerAddress = controllerAddress || ContractAddrs.controller;

  if (signer) {
    ens = new ethers.Contract(ensAddress, EnsAbi, signer);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, signer);
    registrar = new ethers.Contract(registrarAddress, RegistrarAbi, signer);
    controller = new ethers.Contract(controllerAddress, ETHRegistrarControllerAbi, signer);
  } else {
    ens = new ethers.Contract(ensAddress, EnsAbi, provider);
    resolver = new ethers.Contract(resolverAddress, ResolverAbi, provider);
    registrar = new ethers.Contract(registrarAddress, RegistrarAbi, provider);
    controller = new ethers.Contract(controllerAddress, ETHRegistrarControllerAbi, provider);
  }

  ensAddr = ensAddress;
  resolverAddr = resolverAddress;

  return {
    provider,
    signer,
    ens,
    resolver,
    registrar,
    controller,
  };
}

export function getProvider() {
  return provider;
}

export function getSigner(): JsonRpcSigner {
  return signer;
}

export function getAccount(): string {
  return account;
}

/** 获取域名的当前所有者 */
export async function getOwner(node: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(node);
  return ens.owner(namehash);
}

/** 获取域名的解析器合约 */
export function getResolver(name: DomainString): Promise<HexAddress> {
  let namehash = getNamehash(name);
  return ens.resolver(namehash);
}

/** 获取域名的解析地址 */
export async function getAddr(name: DomainString, key: string): Promise<HexAddress> {
  const namehash = getNamehash(name);
  // const resolverAddr = await ensContract.resolver(namehash)

  try {
    // todo : switch cointype
    // const { coinType, encoder } = formatsByName[key]
    let coinType = 60;
    const addr = await resolver["addr(bytes32,uint256)"](namehash, coinType);
    if (addr === "0x") return emptyAddress;

    // return encoder(Buffer.from(addr.slice(2), 'hex'))
    return addr;
  } catch (e) {
    console.log(e);
    console.warn("Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?");
    return emptyAddress;
  }
}

/** 设置域名的解析地址 */
export async function setAddr(name: DomainString, key: string, value: string): Promise<HexAddress> {
  const namehash = getNamehash(name);
  // const resolverAddr = await ensContract.resolver(namehash)

  try {
    // todo : switch cointype
    // const { coinType, encoder } = formatsByName[key]
    let coinType = 60;
    const addr = await resolver["setAddr(bytes32,uint256,bytes)"](namehash, coinType, value);
    if (addr === "0x") return emptyAddress;

    // return encoder(Buffer.from(addr.slice(2), 'hex'))
    return addr;
  } catch (e) {
    console.log(e);
    console.warn("Error getting addr on the resolver contract, are you sure the resolver address is a resolver contract?");
    return emptyAddress;
  }
}

/** 获得 MinimumCommitmentAge 参数，即注册的第一步到第二步之间的最小时间间隔 */
export function getMinimumCommitmentAge(controller: any): Promise<number> {
  return controller.minCommitmentAge();
}

/** 获得 getMaximumCommitmentAge 参数，即注册的第一步到第二步之间的最大时间间隔 */
export function getMaximumCommitmentAge(controller: any): Promise<number> {
  return controller.maxCommitmentAge();
}

/** 获得当前域名注册价格
 * function getRentPrice(string name, uint duration) returns (uint)
 * getRentPrice('hero', 86400*365) */
export async function getRentPrice(name: DomainString, duration: number): Promise<BigNumber> {
  await setup();
  let price = await (await controller.rentPrice(name, duration)).toNumber();
  return price;
}

/** 批啦获得当前域名注册价格 */
export async function getRentPrices(labels: string[], duration: number): Promise<BigNumber> {
  const pricesArray = await Promise.all(
    labels.map((label) => {
      return getRentPrice(label, duration);
    })
  );
  return pricesArray.reduce((a: any, c) => a.add(c));
}

/** 计算commitment */
export async function makeCommitment(name: DomainString, account: HexAddress): Promise<HexAddress> {
  let secret = getNamehash("eth"); // todo: store user
  if (parseInt(resolverAddr, 16) === 0) {
    return controller.makeCommitment(name, account, secret);
  } else {
    return controller.makeCommitmentWithConfig(name, account, secret, resolverAddr, account);
  }
}

/** 检查是否已经提交commitment */
export async function checkCommitment(account: string, label: DomainString) {
  const commitment = await makeCommitment(label, account);
  return controller.commitments(commitment);
}

/** 开始注册域名（第一步），这一步是提交commitment */
export async function commit(label: DomainString, account: string) {
  const commitment = await makeCommitment(label, account);

  return controller.commit(commitment);
}

/** 域名注册（第二步），完成域名注册 */
export async function register(label: DomainString, account: string, duration: number): Promise<void> {
  const price = await getRentPrice(label, duration);
  const priceWithBuffer = getBufferedPrice(price);
  // const resolverAddr = await getowner("resolver.eth");
  let secret = getNamehash("eth");

  return controller.registerWithConfig(label, account, duration, secret, resolverAddr, account, { value: priceWithBuffer, gasLimit: 500000 });
}

export function decodeContenthash(encoded: string): any {
  let decoded, protocolType, error;
  if (!encoded || encoded === "0x") {
    return {};
  }
  if (encoded) {
    try {
      // decoded = contentHash.decode(encoded) // todo
      // const codec = contentHash.getCodec(encoded)
      decoded = encoded;
    } catch (e) {
      error = e.message;
    }
  }
  return { protocolType: "ipfs", decoded, error };
}

/** 获得域名的IPFS内容地址 */
export async function getContent(name: DomainString): Promise<ContentType> {
  try {
    const namehash = getNamehash(name);
    const encoded = await resolver.contenthash(namehash);
    return {
      value: `ipfs://${ethers.utils.base58.encode(encoded)}`,
      contentType: "contenthash",
    };
  } catch (e) {
    const message = "Error getting content on the resolver contract, are you sure the resolver address is a resolver contract?";
    console.warn(message, e);
    return { value: "", contentType: "error" };
  }
}

/** 获得域名详细信息 */
export async function getDomainDetails(name: DomainString) {
  const nameArray = name.split(".");
  const labelhash = getLabelhash(nameArray[0]);
  const owner = await getOwner(name);
  const nameResolver = await getResolver(name);

  const node = {
    name,
    label: nameArray[0],
    labelhash,
    owner,
    nameResolver,
  };

  if (parseInt(nameResolver, 16) === 0) {
    return {
      ...node,
      addr: null,
      content: null,
    };
  } else {
    try {
      const addr = await getAddr(node.name, "ETH");
      const content = "await getContent(ens, resolver, node.name)";
      return {
        ...node,
        addr,
        // content: content.value,
        // contentType: content.contentType
      };
    } catch (e) {
      return {
        ...node,
        addr: "0x0",
        content: "0x0",
        contentType: "error",
      };
    }
  }
}

/** 一次性设置域名信息
 * function setRecord(bytes32 node, address owner, address resolver, uint64 ttl)
 * setRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setRecord(node: DomainString, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
  let namehash = getNamehash(node);
  return ens.setRecord(namehash, newOwner, resolver, ttl);
}

/** 一次性设置域名信息
 * function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl)
 * setSubnodeRecord('hero.eth', 'sub', '0x123456789', '0x123456789', 86400) */
export function setSubnodeRecord(node: DomainString, label: string, newOwner: HexAddress, resolver: HexAddress, ttl: number): Promise<any> {
  let namehash = getNamehash(node);
  label = "0x" + sha3(label) || "0x0";
  return ens.setSubnodeRecord(namehash, label, newOwner, resolver, ttl);
}

/** 设置子域名的所有者
 * function setOwner(bytes32 node, address owner)
 * setOwner('hero.eth', '0x123456789') */
export function setOwner(node: DomainString, newOwner: HexAddress): Promise<any> {
  let namehash = getNamehash(node);
  return ens.setOwner(namehash, newOwner);
}

/** 设置子域名的所有者
 * function setSubnodeOwner(bytes32 node, bytes32 label, address owner)
 * setSubnodeOwner('hero.eth', 'sub', '0x123456789') */
export function setSubnodeOwner(node: DomainString, label: string, newOwner: HexAddress): Promise<any> {
  let namehash = getNamehash(node);
  label = "0x" + sha3(label) || "0x0";
  return ens.setSubnodeOwner(namehash, label, newOwner);
}

/** 设置域名 resolver 参数，表示域名的解析器
 * function setResolver(bytes32 node, address resolver)
 * setResolver('hero.eth', '0x123456789') */
export function setResolver(node: DomainString, resolver: HexAddress): Promise<any> {
  let namehash = getNamehash(node);
  return ens.setResolver(namehash, resolver);
}

/** 设置域名的默认 resolver 参数，表示域名的解析器 */
export function setDefaultResolver(node: DomainString): Promise<any> {
  let namehash = getNamehash(node);
  return ens.setResolver(namehash, resolverAddr);
}

/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 node, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export function setTTL(node: DomainString, ttl: number): Promise<void> {
  let namehash = getNamehash(node);
  return ens.setTTL(namehash, ttl);
}

/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 node) returns (uint64)
 * getTTL('hero.eth') */
export function getTTL(node: DomainString): Promise<number> {
  let namehash = getNamehash(node);
  return ens.ttl(namehash);
}

/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 node, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export function setText(node: DomainString, key: string, value: string): Promise<void> {
  let namehash = getNamehash(node);
  return resolver.setText(namehash, key, value);
}

/** 获得域名 ttl 参数，由用户设置，表示域名可以在本地缓存的时间
 * function getTTL(bytes32 node) returns (uint64)
 * getTTL('hero.eth') */
export function getText(node: DomainString, key: string): Promise<number> {
  let namehash = getNamehash(node);
  return resolver.text(namehash, key);
}

/** 设置域名 ttl 参数，表示域名可以在本地缓存的时间
 * function setTTL(bytes32 node, uint64 ttl)
 * setTTL('hero.eth', 3600) */
export function setContent(node: DomainString, value: string): Promise<void> {
  let namehash = getNamehash(node);
  console.log(resolver);
  return resolver.setContenthash(namehash, value);
}

// server api

/** 获取用户登录的签名token */
export async function signLoginMessage(): Promise<string> {
  let signer = provider.getSigner();

  let content = "PNS Login";
  return signer.signMessage(content);
}

/** 通过用户登录的签名token登录 */
export async function getLoginToken(sig: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "login",
      sig: sig,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

export async function tryLogin(): Promise<string> {
  await setup();
  let hasLocalstorage = typeof (window as any).localStorage !== "undefined";

  if (hasLocalstorage && localStorage.getItem("pns-jwt")) {
    console.log("jwt loaded");
    return localStorage.getItem("pns-jwt");
  } else {
    let signed = await signLoginMessage();
    let { jwt } = await getLoginToken(signed);
    console.log("get new jwt");

    if (hasLocalstorage) {
      localStorage.setItem("pns-jwt", jwt);
    }
    return jwt;
  }
}

/** 列出用户关注的域名列表 */
export async function listFav(token: string, account: HexAddress): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "listFav",
      token: token,
      account: account,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 创建用户关注的域名 */
export async function createFav(token: string, account: HexAddress, domain: DomainString): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "createFav",
      token: token,
      account: account,
      domain: domain,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 取消用户关注的域名 */
export async function deleteFav(token: string, id: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteFav",
      token: token,
      ref: id,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .catch((err) => "err");
}

/** 列出用户的子域名列表 */
export async function listSubdomain(token: string, account: HexAddress): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "listSubdomain",
      token: token,
      account: account,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 创建用户的子域名 */
export async function createSubdomain(token: string, account: HexAddress, domain: DomainString, data: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "createSubdomain",
      token: token,
      account: account,
      domain: domain,
      data: data,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

/** 删除用户的子域名 */
export async function deleteSubdomain(token: string, id: string): Promise<any> {
  return fetch(api_url_base, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteSubdomain",
      token: token,
      ref: id,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
}

export function matchProtocol(text: string): RegExpMatchArray {
  return text.match(/^(ipfs|sia|ipns|bzz|onion|onion3):\/\/(.*)/) || text.match(/\/(ipfs)\/(.*)/) || text.match(/\/(ipns)\/(.*)/);
}

export function getProtocolType(encoded: string): {
  protocolType: string;
  decoded: string;
} {
  let protocolType: string, decoded: string;
  try {
    let matched = matchProtocol(encoded);
    if (matched) {
      protocolType = matched[1];
      decoded = matched[2];
    }
    return {
      protocolType,
      decoded,
    };
  } catch (e) {
    console.log(e);
  }
}

/** 解析IPFS地址 */
export function decodeIpfsUrl(url: string): string {
  let data = getProtocolType(url);
  return "0x" + Buffer.from(ethers.utils.base58.decode(data.decoded)).toString("hex");
}

export function isValidDomain(name: string): boolean {
  return name.length < 64 && domainChecker(name, { allowUnicode: false, subdomain: false });
}

import * as Ipfs from "ipfs"

export type Node = Ipfs.IPFS;

export type Result<T> = {
  isOk: true,
  content: T,
} | {
  isOk: false,
  reason: string,
}

export function ok<T>(content: T): Result<T> {
  return {
    isOk: true,
    content,
  }
}

export function err<T>(reason: string): Result<T> {
  return {
    isOk: false,
    reason,
  }
}

export type Option<T> = {
  isSome: true,
  content: T,
} | {
  isSome: false,
}

export function some<T>(content: T): Option<T> {
  return {
    isSome: true,
    content,
  }
}

export function none<T>(): Option<T> {
  return { isSome: false }
}

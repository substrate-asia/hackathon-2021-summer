/**
 * 多绕一个 js 文件, 不然 TypeScript 检查 JSON 的性能太慢了
 */

import { abi as abi_EnsAbi } from "../contracts/ENSRegistry.json";
import { abi as abi_RegistrarAbi } from "../contracts/BaseRegistrarImplementation.json";
import { abi as abi_ResolverAbi } from "../contracts/PublicResolver.json";
// import { abi as ReverseRegistrar } from "../contracts/ReverseRegistrar.json";
// import { abi as DummyOracleAbi } from "../contracts/DummyOracle.json";
// import { abi as StablePriceOracleAbi } from "../contracts/StablePriceOracle.json";
import { abi as abi_ETHRegistrarControllerAbi } from "../contracts/ETHRegistrarController.json";
import { abi as abi_BulkRenewalAbi } from "../contracts/BulkRenewal.json";

export let EnsAbi = abi_EnsAbi;
export let RegistrarAbi = abi_RegistrarAbi;
export let ResolverAbi = abi_ResolverAbi;
export let ETHRegistrarControllerAbi = abi_ETHRegistrarControllerAbi;
export let BulkRenewalAbi = abi_BulkRenewalAbi;

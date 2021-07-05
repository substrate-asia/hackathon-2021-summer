import { setAccountData } from "controller/account";
import { useState } from "react";
import { ContractAddrs, getOwner, setup, isValidDomain, signLoginMessage, getAccount } from "../../sdk/src/sdk";

/** 用于访问账户信息 */
export let useAccountInfo = () => {
  let [isLoading, setLoading] = useState(false);

  let requestConnect = async (): Promise<void> => {
    setLoading(true);
    // let info = await sdk.getAccount();

    let ctx = await setup(ContractAddrs.ens, ContractAddrs.resolver, ContractAddrs.registrar, ContractAddrs.controller);
    // let _userToken = await signLoginMessage();
    // 页面显示用的 getAccount 获得的钱包地址
    let accountData = getAccount();
    setAccountData(accountData);
    setLoading(false);
    // not returning, use `.data` instead
  };

  let disconnect = () => {
    console.error("TODO");
    setAccountData(null);
  };

  return {
    isLoading,
    requestConnect,
    disconnect,
  };
};

/** 检查域名是否已经被注册 */
export let useCheckName = () => {
  let [isLoading, setLoading] = useState(false);
  let [result, setResult] = useState(
    null as {
      invalid: boolean;
      name: string;
      available: boolean;
    }
  );

  let check = async (
    name: string,
    options?: {
      onOk?: (name: string) => void;
    }
  ) => {
    if (!isValidDomain(name)) {
      setResult({
        invalid: true,
        name: name,
        available: false,
      });
    } else {
      setLoading(true);
      let v = await getOwner(name); // ??
      // 找不到 owner, ok
      let result = parseInt(v) === 0;

      console.log("check result", v);
      setResult({
        invalid: false,
        name: name,
        available: result,
      });
      if (result) {
        options?.onOk?.(name);
      }
      setLoading(false);
    }
  };

  let reset = () => {
    setResult(null);
    setLoading(false);
  };

  return {
    isLoading,
    check,
    result,
    reset,
  };
};

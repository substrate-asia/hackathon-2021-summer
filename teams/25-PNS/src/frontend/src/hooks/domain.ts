import React, { useState, ReactNode, useEffect } from "react";
import { getRentPrice } from "../../sdk/src/devkit";
import { BigNumber } from "@ethersproject/bignumber";

/** 用于获取域名价格 */
export let useDomainPrice = (name: string, years: number) => {
  let [isLoading, setLoading] = useState(false);
  let [price, setPrice] = useState(null as BigNumber);

  let request = async (name: string, years: number): Promise<void> => {
    setLoading(true);
    try {
      let result = await getRentPrice(name, years);
      setPrice(result);
      setLoading(false);
    } catch (error) {
      console.error("Failed to get price", error);
      setPrice(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    request(name, years);
  }, [name, years]);

  return {
    price,
    isLoading,
    request,
  };
};

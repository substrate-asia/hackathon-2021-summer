import React, { Context, useCallback, useContext, useEffect, useState } from 'react';
import { useApi } from '@polkadot/react-hooks';
import { AccountsContext } from './accounts.provider';
import { keyring } from '@polkadot/ui-keyring';
import { handleTxResultsNoQueen } from '@polkadot/react-signer/util';
import { ContractPromise } from '@polkadot/api-contract';
import type { Abi } from '@polkadot/api-contract';
import type { AbiMessage } from '@polkadot/api-contract/types';
import type { Call } from '@polkadot/types/interfaces/runtime';
import type { ApiPromise } from '@polkadot/api';
import type { Codec, IExtrinsic, IMethod, TypeDef } from '@polkadot/types/types';
import type { Index } from '@polkadot/types/interfaces';
import { Enum, getTypeDef, GenericCall } from '@polkadot/types';
import BN from 'bn.js';
import { ContractBenchmark } from '../../pages/Home/Contracts/Contract';

interface BenchmarkContextProps {
  sended: number;
  successed: number;
  failed: number;
  start: (params: BenchmarkParams) => Promise<void>;
}

export const BenchmarkContext: Context<BenchmarkContextProps> = React.createContext({}as unknown as BenchmarkContextProps);

interface BenchmarkParams extends ContractBenchmark {
  abi: Abi;
  tpsLimit: number;
}

const READ_ADDR = '0x'.padEnd(66, '0');

interface Param {
  name: string;
  type: TypeDef;
}

interface Value {
  isValid: boolean;
  value: Codec;
}

function extractState (value: IExtrinsic | IMethod) {
  const params = GenericCall.filterOrigin(value.meta).map(({ name, type }): Param => ({
    name: name.toString(),
    type: getTypeDef(type.toString())
  }));
  const values = value.args.map((value): Value => ({
    isValid: true,
    value
  }));


  return { params, values };
}

function extractCallData(api: ApiPromise, contractPromise: ContractPromise, message: AbiMessage, params: any[], gasLimit: BN) {
  const tx = contractPromise.tx[message.method]({
    gasLimit,
    value: 0,
  }, ...params);
  
  const hex = tx.toHex();
  let extrinsicCall: Call;

  try {
    // cater for an extrinsic input...
    extrinsicCall = api.createType('Call', api.tx(hex).method);
  } catch (e) {
    extrinsicCall = api.createType('Call', hex);
  }

  const { params: paramsDef, values } = extractState(extrinsicCall);
  const dataIndex = paramsDef.findIndex(p => p.name === 'data');

  return values[dataIndex].value.toHex();
}

export const BenchmarkProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const { accounts } = useContext(AccountsContext);
    const { api } = useApi();
    const [ sended, setSended ] = useState<number>(0);
    const [ successed, setSuccessed ] = useState<number>(0);
    const [ failed, setFailed ] = useState<number>(0);
    
    const start = useCallback(async (params: BenchmarkParams) => {
      setSended(0);
      setSuccessed(0);
      setFailed(0);
      
      if (!params.address || !params.message) {
        return;
      }

      const gasLimit = (new BN(200000)).mul(new BN(1000000));
      const contractPromise = new ContractPromise(api, params.abi, params.address);

      if (!params.message.message.isMutating) {
        for (let i = 0; i < 100; i ++) {
          contractPromise.query[params.message.message.method](READ_ADDR, {}, ...params.message.params)
            .then(result => setSuccessed(old => old + 1), () => setFailed(old => old + 1));
          setSended(old => old + 1);
        }
        return;
      }
      
      if (!params.message.sender) {
        return;
      }

      const { nonce } = await api.query.system.account(params.message.sender);
      const account = accounts.find(account =>
        keyring.encodeAddress(keyring.decodeAddress(account.address), 0) ===
          keyring.encodeAddress(keyring.decodeAddress(params.message!.sender!), 0)
      )

      console.log('account', account);

      if (!account) {
        return;
      }

      const pair = keyring.createFromUri(account.mnemonic);
      console.log('exec');

      for (let i = 1; i <= 10; i ++ ) {
        const data = extractCallData(api, contractPromise, params.message.message, params.message.params, gasLimit);
        const rawTx = api.tx.contracts.call(params.address, 0, gasLimit, data);

        rawTx.signAndSend(pair, {
          nonce: nonce.toNumber() + i,
        }, handleTxResultsNoQueen('signAndSend', {
          txSuccessCb() {
            console.log('success', status);
            setSuccessed(old => old + 1);
          },
          txFailedCb() {
            console.log('failed', status);
            setFailed(old => old + 1);
          },
          txUpdateCb(status) {
            console.log('update', status);
          }
        }, () => {}));

        setSended(old => old + 1);
      }
    }, [api, accounts]);

    return <BenchmarkContext.Provider value={{
      sended,
      successed,
      failed,
      start,
    }}>{children}</BenchmarkContext.Provider>;
  }
);

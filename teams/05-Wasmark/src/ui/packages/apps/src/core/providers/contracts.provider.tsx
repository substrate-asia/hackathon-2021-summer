import { Abi } from '@polkadot/api-contract';
import React, { Context, useCallback, useContext, useEffect, useState } from 'react';
import { InitialParamsContext } from './initial-params.provider';
import { hexToU8a, isHex, u8aToString } from '@polkadot/util';

export interface Code {
  name: string;
  abi: Abi;
  path?: string;
}

interface ContractsContextProps {
  codes: Code[];
  save: (code: Code) => void;
}

const BYTE_STR_0 = '0'.charCodeAt(0);
const BYTE_STR_X = 'x'.charCodeAt(0);
const STR_NL = '\n';

function coverU8a(data: Uint8Array): Uint8Array {
  data = new Uint8Array(data);
  // this converts the input (if detected as hex), via the hex conversion route
  if (data[0] === BYTE_STR_0 && data[1] === BYTE_STR_X) {
    let hex = u8aToString(data);

    while (hex[hex.length - 1] === STR_NL) {
      hex = hex.substr(0, hex.length - 1);
    }

    if (isHex(hex)) {
      return hexToU8a(hex);
    }
  }

  return data;
}

export const ContractsContext: Context<ContractsContextProps> = React.createContext({} as unknown as ContractsContextProps);

export const ContractsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const { initialTestParams } = useContext(InitialParamsContext);
    const [ codes, setCodes ] = useState<Code[]>([]);

    const save = useCallback((code: Code) => {
      console.log('save', code)
      setCodes(codes => {
        if (codes.find(item => item.name === code.name)) {
          return codes;
        }
        
        return [...codes, code];
      })
    }, []);

    
    const remove = useCallback((name: string) => {

    }, []);

    useEffect(() => {
      // initialTestParams?.contracts[0] && coverU8a(initialTestParams?.contracts[0].artifact.data);
      const codes = initialTestParams?.contracts.map(contract => {
        const json = u8aToString(coverU8a(contract.artifact.data));
        const abi = new Abi(json);

        return {
          name: contract.name,
          path: contract.path,
          abi,
        };
      }) || [];

      console.log('codes', codes, initialTestParams?.contracts);

      setCodes(codes);
    }, [initialTestParams]);
    
    return <ContractsContext.Provider value={{
      codes,
      save,
    }}>{children}</ContractsContext.Provider>;
  }
);

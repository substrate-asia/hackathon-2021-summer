import { TestParams } from '@wasmark/apps-common';
import React, { Context, useEffect, useState } from 'react';
import { apiGetInitialConfig } from '../api';
import { keyring } from '@polkadot/ui-keyring';

interface InitialParamsContextProps {
  initialTestParams?: TestParams
}

export const InitialParamsContext: Context<InitialParamsContextProps> = React.createContext({} as unknown as InitialParamsContextProps);

export const InitialParamsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [ initialTestParams, setInitialTestParams ] = useState<TestParams>();

    useEffect(() => {
      const sub = apiGetInitialConfig().subscribe(setInitialTestParams);
  
      return () => sub.unsubscribe();
    }, []);

    return <InitialParamsContext.Provider value={{
      initialTestParams,
    }}>{children}</InitialParamsContext.Provider>;
  }
);

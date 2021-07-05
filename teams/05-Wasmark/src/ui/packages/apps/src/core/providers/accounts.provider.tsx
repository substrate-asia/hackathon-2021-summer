import React, { Context, useContext, useEffect, useState } from 'react';
import { map, filter } from 'rxjs/operators';
import type { KeyringPair$Meta } from '@polkadot/keyring/types';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
import { InitialParamsContext } from './initial-params.provider';
import { keyring } from '@polkadot/ui-keyring';
import { accounts as accountsObservable } from '@polkadot/ui-keyring/observable/accounts';

interface AccountJson extends KeyringPair$Meta {
  address: string;
  genesisHash?: string | null;
  isExternal?: boolean;
  isHardware?: boolean;
  isHidden?: boolean;
  name?: string;
  parentAddress?: string;
  suri?: string;
  type?: KeypairType;
  whenCreated?: number;
}
interface ExtendedAccount extends AccountJson  {
  mnemonic: string;
}

export type AccountInfo = AccountJson & { mnemonic: string };
interface AccountsContextProps {
  accounts: AccountInfo[];
}
function isKeyringLoaded () {
  try {
    return !!keyring.keyring;
  } catch {
    return false;
  }
}

export const AccountsContext: Context<AccountsContextProps> = React.createContext({}as unknown as AccountsContextProps);

function transformAccounts (accounts: SubjectInfo): AccountJson[] {
  return Object.values(accounts).map(({ json: { address, meta }, type }): AccountJson => ({
    address,
    ...meta,
    type
  }));
}

export const AccountsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const { initialTestParams } = useContext(InitialParamsContext);
    // const { connected$ } = useContext(BusContext);
    const [ accounts, setAccounts ] = useState<ExtendedAccount[]>([]);
    const [ signal, updateSignal ] = useState(0);
    
    
    useEffect(() => {
      isKeyringLoaded() || keyring.loadAll({
        type: 'sr25519',
        isDevelopment: false,
      });
      if (!initialTestParams) {
        return;
      }
      console.log(keyring.decodeAddress(keyring.createFromUri('west primary purse shift beauty bomb lumber glad inhale oyster pause buffalo').address), keyring.decodeAddress('5HSzUHRbMa42RbBGAjrS1ch8aLFY3P9RUypean9hTjWc3zEM'))
      initialTestParams.mnemonics.forEach(mnemonic => keyring.addUri(mnemonic));

      const sub = accountsObservable.subject.pipe(
        map(accounts => transformAccounts(accounts)),
        map(accounts =>
          accounts.map(
            account => {
              try {
                const mnemonic = initialTestParams.mnemonics.find(m =>
                  keyring.encodeAddress(
                    keyring.decodeAddress(keyring.createFromUri(m).address),
                    0,
                  ) === keyring.encodeAddress(
                    keyring.decodeAddress(account.address),
                    0,
                  )
                );
                
                return mnemonic && ({
                  ...account,
                  mnemonic,
                })
              } catch (e) {
                return undefined;
              }
            }
          ).filter(Boolean) as ExtendedAccount[]
        ),
      ).subscribe(setAccounts);

      return () => sub.unsubscribe();
    }, [signal, initialTestParams]);

    return <AccountsContext.Provider value={{
      accounts,
    }}>{children}</AccountsContext.Provider>;
  }
);

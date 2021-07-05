// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAll, DeriveDemocracyLock } from '@polkadot/api-derive/types';
import { ActionStatus } from '@polkadot/react-components/Status/types';
import { ProxyDefinition} from '@polkadot/types/interfaces';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { Delegation } from '../types';

import BN from 'bn.js';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { AddressInfo, AddressSmall, Forget, Icon} from '@polkadot/react-components';
import {  useApi, useCall, useToggle } from '@polkadot/react-hooks';
import keyring from '@polkadot/ui-keyring';

import { useTranslation } from '../translate';
import Backup from '../modals/Backup';
import ChangePass from '../modals/ChangePass';
import DelegateModal from '../modals/Delegate';
import Derive from '../modals/Derive';
import IdentityMain from '../modals/IdentityMain';
import IdentitySub from '../modals/IdentitySub';
import ProxyOverview from '../modals/ProxyOverview';
import MultisigApprove from '../modals/MultisigApprove';
import RecoverAccount from '../modals/RecoverAccount';
import RecoverSetup from '../modals/RecoverSetup';
import Transfer from '../modals/Transfer';
import UndelegateModal from '../modals/Undelegate';
import useMultisigApprovals from './useMultisigApprovals';

interface Props {
  account: KeyringAddress;
  className?: string;
  delegation?: Delegation;
  filter: string;
  isFavorite: boolean;
  proxy?: [ProxyDefinition[], BN];
  setBalance: (address: string, value: BN) => void;
  toggleFavorite: (address: string) => void;
}

function Account ({ account: { address, meta }, className = '', delegation, filter, isFavorite, proxy, setBalance, toggleFavorite }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const api = useApi();
  const bestNumber = useCall<BN>(api.api.derive.chain.bestNumber);
  const balancesAll = useCall<DeriveBalancesAll>(api.api.derive.balances.all, [address]);
  const democracyLocks = useCall<DeriveDemocracyLock[]>(api.api.derive.democracy?.locks, [address]);
  const multiInfos = useMultisigApprovals(address);
  const [isBackupOpen, toggleBackup] = useToggle();
  const [isDeriveOpen, toggleDerive] = useToggle();
  const [isForgetOpen, toggleForget] = useToggle();
  const [isIdentityMainOpen, toggleIdentityMain] = useToggle();
  const [isIdentitySubOpen, toggleIdentitySub] = useToggle();
  const [isMultisigOpen, toggleMultisig] = useToggle();
  const [isProxyOverviewOpen, toggleProxyOverview] = useToggle();
  const [isPasswordOpen, togglePassword] = useToggle();
  const [isRecoverAccountOpen, toggleRecoverAccount] = useToggle();
  const [isRecoverSetupOpen, toggleRecoverSetup] = useToggle();
  const [isTransferOpen, toggleTransfer] = useToggle();
  const [isDelegateOpen, toggleDelegate] = useToggle();
  const [isUndelegateOpen, toggleUndelegate] = useToggle();

  useEffect((): void => {
    if (balancesAll) {
      setBalance(address, balancesAll.freeBalance.add(balancesAll.reservedBalance));

    }
  }, [address, api, balancesAll, setBalance]);

  useEffect((): void => {

  }, [address, api, bestNumber, democracyLocks]);

  const _onFavorite = useCallback(
    () => toggleFavorite(address),
    [address, toggleFavorite]
  );

  const _onForget = useCallback(
    (): void => {
      if (!address) {
        return;
      }

      const status: Partial<ActionStatus> = {
        account: address,
        action: 'forget'
      };

      try {
        keyring.forgetAccount(address);
        status.status = 'success';
        status.message = t<string>('account forgotten');
      } catch (error) {
        status.status = 'error';
        status.message = (error as Error).message;
      }
    },
    [address, t]
  );


  return (
    <tr className={className}>
      <td className='favorite'>
        <Icon
          color={isFavorite ? 'orange' : 'gray'}
          icon='star'
          onClick={_onFavorite}
        />
      </td>
     <td className='address'>
       <AddressSmall value={address} />
       {isBackupOpen && (
         <Backup
           address={address}
           key='modal-backup-account'
           onClose={toggleBackup}
         />
       )}
       {isDelegateOpen && (
         <DelegateModal
           key='modal-delegate'
           onClose={toggleDelegate}
           previousAmount={delegation?.amount}
           previousConviction={delegation?.conviction}
           previousDelegatedAccount={delegation?.accountDelegated}
           previousDelegatingAccount={address}
         />
       )}
       {isDeriveOpen && (
         <Derive
           from={address}
           key='modal-derive-account'
           onClose={toggleDerive}
         />
       )}
       {isForgetOpen && (
         <Forget
           address={address}
           key='modal-forget-account'
           onClose={toggleForget}
           onForget={_onForget}
         />
       )}
       {isIdentityMainOpen && (
         <IdentityMain
           address={address}
           key='modal-identity-main'
           onClose={toggleIdentityMain}
         />
       )}
       {isIdentitySubOpen && (
         <IdentitySub
           address={address}
           key='modal-identity-sub'
           onClose={toggleIdentitySub}
         />
       )}
       {isPasswordOpen && (
         <ChangePass
           address={address}
           key='modal-change-pass'
           onClose={togglePassword}
         />
       )}
       {isTransferOpen && (
         <Transfer
           key='modal-transfer'
           onClose={toggleTransfer}
           senderId={address}
         />
       )}
       {isProxyOverviewOpen && (
         <ProxyOverview
           key='modal-proxy-overview'
           onClose={toggleProxyOverview}
           previousProxy={proxy}
           proxiedAccount={address}
         />
       )}
       {isMultisigOpen && multiInfos && (
         <MultisigApprove
           address={address}
           key='multisig-approve'
           onClose={toggleMultisig}
           ongoing={multiInfos}
           threshold={meta.threshold as number}
           who={meta.who as string[]}
         />
       )}
       {isRecoverAccountOpen && (
         <RecoverAccount
           address={address}
           key='recover-account'
           onClose={toggleRecoverAccount}
         />
       )}
       {isRecoverSetupOpen && (
         <RecoverSetup
           address={address}
           key='recover-setup'
           onClose={toggleRecoverSetup}
         />
       )}
       {isUndelegateOpen && (
         <UndelegateModal
           accountDelegating={address}
           key='modal-delegate'
           onClose={toggleUndelegate}
         />
       )}
     </td>


      <td className='address'>

      </td>
      <td />
      <td className='number'>
        <AddressInfo
          address={address}
          withBalance
          withBalanceToggle
          withExtended={false}
        />
      </td>
      <td />
      <td className='number'>
        <AddressInfo
          address={address}
          withBalance
          withBalanceToggle
          withExtended={false}
        />
      </td>
      <td className='address'>

      </td>
      <td />
      <td />
      <td />
    </tr>
  );
}

export default React.memo(styled(Account)`
  .tags {
    width: 100%;
    min-height: 1.5rem;
  }
`);

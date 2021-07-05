// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

//import { DeriveAccountPowers} from '@polkadot/api-derive/types';
import { DeriveAppFinanceRecord, DeriveApp} from '@polkadot/api-derive/types';

import { ActionStatus } from '@polkadot/react-components/Status/types';
import { AccountId, ProxyDefinition, ProxyType, Voting } from '@polkadot/types/interfaces';
import { Delegation, SortedAccount } from '../types';

import BN from 'bn.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
//import { isLedger } from '@polkadot/react-api';
import { useApi, useAccounts, useCall, useFavorites, useLoadingDelay , useToggle} from '@polkadot/react-hooks';
//import { FormatBalance } from '@polkadot/react-query';
import { Button, Input, Table } from '@polkadot/react-components';
import { BN_ZERO } from '@polkadot/util';

import { useTranslation } from '../translate';

import Account from './Account';
import { sortAccounts } from '../util';
import Summary from './Summary';
import FilterView from '../modals/FilterView';

interface Balances {
  accounts: Record<string, BN>;
  balanceTotal?: BN;
}

interface Sorted {
  sortedAccounts: SortedAccount[];
  sortedAddresses: string[];
}

interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
}

const STORE_FAVS = 'accounts:favorites';

function Overview ({ className = '', onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isFilterViewOpen, toggleFilterView] = useToggle();
  const { allAccounts, hasAccounts } = useAccounts();
  const [favorites, toggleFavorite] = useFavorites(STORE_FAVS);
  const [{ balanceTotal }, setBalances] = useState<Balances>({ accounts: {} });
  const [filterOn, setFilter] = useState<string>('');
  const [sortedAccountsWithDelegation, setSortedAccountsWithDelegation] = useState<SortedAccount[] | undefined>();
  const [{ sortedAccounts, sortedAddresses }, setSorted] = useState<Sorted>({ sortedAccounts: [], sortedAddresses: [] });
  const delegations = useCall<Voting[]>(api.query.democracy?.votingOf?.multi, [sortedAddresses]);
  const proxies = useCall<[ProxyDefinition[], BN][]>(api.query.proxy?.proxies.multi, [sortedAddresses], {
    transform: (result: [([AccountId, ProxyType] | ProxyDefinition)[], BN][]): [ProxyDefinition[], BN][] =>
      api.tx.proxy.addProxy.meta.args.length === 3
        ? result as [ProxyDefinition[], BN][]
        : (result as [[AccountId, ProxyType][], BN][]).map(([arr, bn]): [ProxyDefinition[], BN] =>
          [arr.map(([delegate, proxyType]): ProxyDefinition => api.createType('ProxyDefinition', { delegate, proxyType })), bn]
        )
  });
  const isLoading = useLoadingDelay();

  const [queryStatus, setQueryStatus] = useState<boolean>(false);
  const [appId, setAppId] = useState<string>('');
  const [proposalId, setProposalId] = useState<string>('');
  console.log("queryStatus:"+queryStatus);

  const appFinanceRecords = useCall<DeriveAppFinanceRecord[]>(api.derive.kp.appFinanceRecords);
 // console.log("appFinanceRecords:"+JSON.stringify(appFinanceRecords));
  var appIdList: Array<string>=[];
  var proposalIdList: Array<string>=[];

  const apps = useCall<DeriveApp>(api.derive.members.apps);

  if (!!apps) {
    apps.infos.forEach(app => {
      appIdList.push(app.appId+'');
    });
  }
  //console.log("appIdList:"+JSON.stringify(appIdList));

  var income = new BN(0);

  //默认显示最新一期：
   var queryLbParamItem: Array<string>=[];
   if( !!appFinanceRecords && appFinanceRecords.length > 0 ){
     appFinanceRecords.forEach((val, idx, array) => {
        var flag = true;
        if(appId!=''){
          if((val.appId+'')!= (appId+'')){
            flag = false;
          }
        }
        if(proposalId!=''){
          if((val.proposalId+'')!= (proposalId+'')){
            flag = false;
          }
        }
        if(flag){
          queryLbParamItem.push(val.appId+'');
          queryLbParamItem.push(val.block+'');
          queryLbParamItem.push(val.proposalId+'');
          income = val.totalBalance;
        }else{
          income = val.totalBalance;
        }
        proposalIdList.push(val.proposalId+'');
     });
   }
   //console.log("queryLbParamItem:"+JSON.stringify(queryLbParamItem));
   if(appId==''&& appIdList.length>0){
     setAppId(appIdList[0]);
   }
   if(proposalId==''&& proposalIdList.length>0){
     setProposalId(proposalIdList[0]);
   }

  useEffect(() => {

    console.log(appId + ', ' + proposalId);
    setFilter(appId +', ' + proposalId);

  }, [api, appId, proposalId, appFinanceRecords]);

  useEffect((): void => {
    const sortedAccounts = sortAccounts(allAccounts, favorites);
    const sortedAddresses = sortedAccounts.map((a) => a.account.address);

    setSorted({ sortedAccounts, sortedAddresses });
  }, [allAccounts, favorites]);

  useEffect(() => {
    if (api.query.democracy?.votingOf && !delegations?.length) {
      return;
    }

    setSortedAccountsWithDelegation(
      sortedAccounts?.map((account, index) => {
        let delegation: Delegation | undefined;

        if (delegations && delegations[index]?.isDelegating) {
          const { balance: amount, conviction, target } = delegations[index].asDelegating;

          delegation = {
            accountDelegated: target.toString(),
            amount,
            conviction
          };
        }

        return ({
          ...account,
          delegation
        });
      })
    );
  }, [api, delegations, sortedAccounts]);

 const headerRef = useRef([
    [t('accounts'), 'start', 3],
    [t('parent'), 'address media--1400'],
    [t('type')],
    [t('tags'), 'start'],
    [t('balance'), 'number'],
    [t('Permitted redemption number'), 'start'],
    [t('Redemption number'), 'number'],
    [],

  ]);

  const _setBalance = useCallback(
    (account: string, balance: BN) =>
      setBalances(({ accounts }: Balances): Balances => {
        accounts[account] = balance;

        return {
          accounts,
          balanceTotal: Object.values(accounts).reduce((total: BN, value: BN) => total.add(value), BN_ZERO)
        };
      }),
    []
  );

  const footer = useMemo(() => (
    <tr>
      <td colSpan={3} />
      <td className='media--1400' />
      <td colSpan={2} />
      <td className='media--1500' />
      <td />
      <td />
      <td className='media--1400' />
    </tr>
  ), [balanceTotal]);

  const filter = useMemo(() => (
    <div className='filter--tags'>
      <Input
        autoFocus
        isFull
        label={t<string>('filter by name or tags')}
        onChange={setFilter}
        value={filterOn}
      />
    </div>
  ), [filterOn, t]);



  return (
    <div className={className}>
      <div className={className} >
       <Summary
          redeemCount={appFinanceRecords?Number(appFinanceRecords.length):0}
          income={income?income:new BN(0)}
       />
      </div>
      <div className={className} >
        {isFilterViewOpen && (
          <FilterView
            appIdList={appIdList}
            proposalIdList={proposalIdList}
            onClose={toggleFilterView}
            onStatusChange={onStatusChange}
            changeQueryStatus={setQueryStatus}
            changeAppId={setAppId}
            changeProposalId={setProposalId}
          />
        )}
       <Button
         icon='plus'
         isDisabled={false}
         label={t<string>('Redemption query')}
         onClick={toggleFilterView}
       />
      </div>
      <Table
        empty={(!hasAccounts || (!isLoading && sortedAccountsWithDelegation)) && t<string>("You don't have any accounts. Some features are currently hidden and will only become available once you have accounts.")}
        filter={filter}
        footer={footer}
        header={headerRef.current}
      >
        {!isLoading && sortedAccountsWithDelegation?.map(({ account, delegation, isFavorite }, index): React.ReactNode => (
          <Account
            param2={queryLbParamItem}
            account={account}
            delegation={delegation}
            filter={filterOn}
            isFavorite={isFavorite}
            key={index}
            proxy={proxies?.[index]}
            setBalance={_setBalance}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </Table>
    </div>
  );
}

export default React.memo(styled(Overview)`
  .filter--tags {
    .ui--Dropdown {
      padding-left: 0;

      label {
        left: 1.55rem;
      }
    }
  }
`);

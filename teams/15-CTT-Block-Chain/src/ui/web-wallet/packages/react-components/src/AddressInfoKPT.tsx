// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAll, DeriveDemocracyLock, DeriveStakingAccount } from '@polkadot/api-derive/types';
import { BlockNumber } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';
import { Expander } from '@polkadot/react-components';
import { withCalls, withMulti } from '@polkadot/react-api/hoc';
import { useAccounts, useApi, useCall } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';

import Label from './Label';

// true to display, or (for bonded) provided values [own, ...all extras]
export interface BalanceActiveType {
  available?: boolean;
  bonded?: boolean | BN[];
  extraInfo?: [React.ReactNode, React.ReactNode][];
  locked?: boolean;
  redeemable?: boolean;
  reserved?: boolean;
  total?: boolean;
  unlocking?: boolean;
  vested?: boolean;
}

export interface CryptoActiveType {
  crypto?: boolean;
  nonce?: boolean;
}

export interface ValidatorPrefsType {
  unstakeThreshold?: boolean;
  validatorPayment?: boolean;
}

interface Props {
  isformat?: false;
  kptInfo?: string[];
  address: string;
  balancesAll?: DeriveBalancesAll;
  children?: React.ReactNode;
  className?: string;
  democracyLocks?: DeriveDemocracyLock[];
  extraInfo?: [string, string][];
  stakingInfo?: DeriveStakingAccount;
  withBalance?: boolean | BalanceActiveType;
  withBalanceToggle?: false;
  withExtended?: boolean | CryptoActiveType;
  withHexSessionId?: (string | null)[];
  withValidatorPrefs?: boolean | ValidatorPrefsType;
  withoutLabel?: boolean;
}

function renderBalances (props: Props, allAccounts: string[], bestNumber: BlockNumber | undefined): React.ReactNode {
  const { isformat = false,kptInfo=[], withBalanceToggle = false } = props;
  //console.log("isformat:"+isformat);
  //console.log("kptInfo:"+JSON.stringify(kptInfo));
  var total = BigInt(0);
  var total2: number =0;
  if(kptInfo.length>0){
    for(var a = 0; a < kptInfo.length; a++){
      if(isformat){
        //console.log("kptInfo[a].substring(0,kptInfo[a].length-4):"+kptInfo[a].substring(0,kptInfo[a].length-4));
        total2 = total2 + Number(kptInfo[a].substring(0,kptInfo[a].length-4));
      }else{
        total = total + BigInt(kptInfo[a]);
      }
    }
  }
  //console.log("total:"+total);
  //console.log("total2:"+total2);

  const allItems = (
    <>
      {!isformat && kptInfo?.map(( kpt, index): React.ReactNode => (
        <>
          <Label
          label={
            <FormatBalance className='result' value={BigInt(kpt)} />
          }
          />
        </>
      ))}
      {isformat && kptInfo?.map(( kpt, index): React.ReactNode => (
        <>
          <Label
          label={
            kpt
          }
          />
        </>
      ))}
    </>
  );

  if (withBalanceToggle) {
    return (
      <>
        <Expander summary={ isformat ? total2+' KPT' : <FormatBalance value={total} />}>
          <div className='body column'>
            {allItems}
          </div>
        </Expander>
      </>
    );
  }

  return (
    <>
      {allItems}
    </>
  );
}

function AddressInfo (props: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const { allAccounts } = useAccounts();
  const bestNumber = useCall<BlockNumber>(api.derive.chain.bestNumber);
  const { className = '', withBalanceToggle } = props;

  return (
   <div className={`ui--AddressInfo${className}${withBalanceToggle ? ' ui--AddressInfo-expander' : ''}`}>
     <div className={`column${withBalanceToggle ? ' column--expander' : ''}`}>
       {renderBalances(props, allAccounts, bestNumber)}

     </div>
   </div>
  );
}

export default withMulti(
  styled(AddressInfo)`
    align-items: flex-start;
    display: flex;
    flex: 1;
    white-space: nowrap;

    &:not(.ui--AddressInfo-expander) {
      justify-content: center;
    }

    .column {
      justify-content: start;

      &.column--expander {
        width: 17.5rem;

        .ui--Expander {
          width: 100%;

          .summary {
            display: inline-block;
            text-align: right;
            min-width: 12rem;
          }
        }
      }

      &:not(.column--expander) {
        flex: 1;
        display: grid;
        opacity: 1;

        label {
          grid-column: 1;
          padding-right: 0.5rem;
          text-align: right;
          vertical-align: middle;

          .help.circle.icon {
            display: none;
          }
        }

        .result {
          grid-column: 2;

          .icon {
            margin-left: 0;
            margin-right: 0.25rem;
            padding-right: 0 !important;
          }
        }
      }
    }
  `,
  withCalls<Props>(

  )
);

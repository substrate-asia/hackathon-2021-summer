// Copyright 2017-2020 @polkadot/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

//import BN from 'bn.js';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { stringToU8a } from '@polkadot/util';

import { useTranslation } from '../translate';

const TREASURY_ACCOUNT = stringToU8a('modlpy/trfin'.padEnd(32, '\0'));//融资

interface Props {
  approvalCount?: number;
  proposalCount?: number;
}

//const PM_DIV = new BN(1000000);

function Summary ({ approvalCount, proposalCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  //const bestNumber = useCall<Balance>(api.derive.chain.bestNumber);
  //const totalProposals = useCall<BN>(api.query.treasuryFin.proposalCount);
  const treasuryBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TREASURY_ACCOUNT]);
  //const spendPeriod = api.consts.treasuryFin.spendPeriod;
  //console.log("treasuryBalance:"+JSON.stringify(treasuryBalance))


  const value = treasuryBalance?.freeBalance.gtn(0)
    ? treasuryBalance.freeBalance
    : null;
  /* const burn = treasuryBalance?.freeBalance.gtn(0) && !api.consts.treasuryFin.burn.isZero()
    ? api.consts.treasuryFin.burn.mul(treasuryBalance?.freeBalance).div(PM_DIV)
    : null; */

  //融资基金存量=融资余额
  let fundStock = BigInt(1);
  if(!!value){
    fundStock=BigInt(value+'');
    //console.log("fundStock:"+fundStock);
  }
  //融资基金发行量=5亿-基金存量
  let initial_issue_quantity = BigInt('50000000000000000000000');
  if(!!fundStock){
    initial_issue_quantity=initial_issue_quantity-fundStock;
    //console.log("initial_issue_quantity:"+initial_issue_quantity);
  }

  return (
    <SummaryBox>
      <section>

      </section>
      <section className='media--1000 number'>
        {
          initial_issue_quantity
        ?
        (
          <CardSummary className='media--1000' label={t<string>('Initial issue quantity of FinancingFund')}>
            <FormatBalance
              value={initial_issue_quantity}
              withSi
            />
          </CardSummary>
        )
        :
        (
          <CardSummary className='media--1000' label={t<string>('Initial issue quantity of FinancingFund')}>
            <FormatBalance
              value={0}
              withSi
            />
          </CardSummary>
        )

        }
      </section>
      <section className='media--1000 number'>

        {fundStock && (
          <CardSummary className='media--1000' label={t<string>('Fund stock of FinancingFund')}>
            <FormatBalance
              value={fundStock}
              withSi
            />
          </CardSummary>
        )}

      </section>
      <section>

      </section>
      <section>

      </section>
      <section>

      </section>

    </SummaryBox>
  );
}

export default React.memo(Summary);

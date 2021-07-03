// Copyright 2017-2020 @polkadot/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

//import BN from 'bn.js';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import {  stringToU8a } from '@polkadot/util';
//import ProposalCreate from './ProposalCreate';
//import Proposals from './Proposals';

import { useTranslation } from '../translate';


const TRMODEL_ACCOUNT = stringToU8a('modlpy/trmod'.padEnd(32, '\0'));//模型

interface Props {
  approvalCount?: number;
  proposalCount?: number;
}

//const PM_DIV = new BN(1000000);

function Summary ({ approvalCount, proposalCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  //const bestNumber = useCall<Balance>(api.derive.chain.bestNumber);
  //const totalProposals = useCall<BN>(api.query.treasury.proposalCount);
  const trmodelBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TRMODEL_ACCOUNT]);
  //const spendPeriod = api.consts.treasury.spendPeriod;
  //const [isPreimageOpen, togglePreimage] = useToggle();

  const value_tr = trmodelBalance?.freeBalance.gtn(0)
    ? trmodelBalance.freeBalance
    : null;
 /* const burn = treasuryBalance?.freeBalance.gtn(0) && !api.consts.treasury.burn.isZero()
    ? api.consts.treasury.burn.mul(treasuryBalance?.freeBalance).div(PM_DIV)
    : null; */
 //模型增发基存量=模型创建基金余额
    let fundStock_tr = BigInt(1);
    if(!!value_tr){
      fundStock_tr=BigInt(value_tr+'');
      //console.log("fundStock:"+fundStock);
    }
    //模型增发基金发行量=3亿-基金存量
    let initial_issue_quantity_tr = BigInt('30000000000000000000000');
    if(!!fundStock_tr){
      initial_issue_quantity_tr=initial_issue_quantity_tr-fundStock_tr;
     // console.log("initial_issue_quantity_tr:"+initial_issue_quantity_tr);
    }
  return (
    <SummaryBox>
      <section>

      </section>
      <section className='media--1000 number'>
        {
          initial_issue_quantity_tr
        ?
         (
          <CardSummary className='media--1000' label={t<string>('Initial issue quantity of model Additional')}>
            <FormatBalance
              value={initial_issue_quantity_tr}
              withSi
            />
          </CardSummary>
        )
        :
        (
          <CardSummary className='media--1000' label={t<string>('Initial issue quantity of model Additional')}>
            <FormatBalance
              value={0}
              withSi
            />
          </CardSummary>
        )

        }
      </section>
      <section className='media--1000 number'>

        {fundStock_tr && (
          <CardSummary
            className='media--1000'
            label={t<string>('Total model Additional balance')}
          >
            <FormatBalance
              value={fundStock_tr}
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

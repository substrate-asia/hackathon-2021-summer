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

const ACMODEL_ACCOUNT = stringToU8a('modlpy/acmod'.padEnd(32, '\0'));//模型

interface Props {
  approvalCount?: number;
  proposalCount?: number;
}

//const PM_DIV = new BN(1000000);

function Summary ({ approvalCount, proposalCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
 // const bestNumber = useCall<Balance>(api.derive.chain.bestNumber);
  //const totalProposals = useCall<BN>(api.query.treasuryMod.proposalCount);
  const acmodelBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [ACMODEL_ACCOUNT]);
 //const spendPeriod = api.consts.treasuryMod.spendPeriod;

  const value_ac = acmodelBalance?.freeBalance.gtn(0)
    ? acmodelBalance.freeBalance
    : null;
 /* const burn = treasuryBalance?.freeBalance.gtn(0) && !api.consts.treasuryMod.burn.isZero()
    ? api.consts.treasuryMod.burn.mul(treasuryBalance?.freeBalance).div(PM_DIV)
    : null; */

  //模型创建基金存量=融资余额
  let fundStock_ac = BigInt(1);
  if(!!value_ac){
    fundStock_ac=BigInt(value_ac+'');
    //console.log("fundStock_ac:"+fundStock_ac);
  }
  //模型创建基金发行量=1亿-基金存量
  let initial_issue_quantity_ac = BigInt('10000000000000000000000');
  if(!!fundStock_ac){
    initial_issue_quantity_ac=initial_issue_quantity_ac - fundStock_ac;
    //console.log("initial_issue_quantity_ac:"+initial_issue_quantity_ac);
  }

  return (
    <SummaryBox>
      <section>

      </section>
      <section className='media--1000 number'>
        {
          initial_issue_quantity_ac
        ?
        (
          <CardSummary className='media--1000' label={t<string>('Initial issue quantity of model creation')}>
            <FormatBalance
              value={initial_issue_quantity_ac}
              withSi
            />
          </CardSummary>
        )
        :
        (
          <CardSummary className='media--1000' label={t<string>('Initial issue quantity of model creation')}>
            <FormatBalance
              value={0}
              withSi
            />
          </CardSummary>
        )

        }
      </section>
      <section className='media--1000 number'>

        {fundStock_ac && (
          <CardSummary
            className='media--1000'
            label={t<string>('Total model creation balance')}
          >
            <FormatBalance
              value={fundStock_ac}
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

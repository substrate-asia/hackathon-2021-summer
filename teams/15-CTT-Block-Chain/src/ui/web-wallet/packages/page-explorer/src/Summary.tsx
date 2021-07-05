// Copyright 2017-2020 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAccount } from '@polkadot/api-derive/types';

import React from 'react';
import { useApi, useCall } from '@polkadot/react-hooks';

import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { TimeNow, BlockToTime, FormatBalance } from '@polkadot/react-query';
import { BN_ONE } from '@polkadot/util';

import { stringToU8a } from '@polkadot/util';

import SummarySession from './SummarySession';
import { useTranslation } from './translate';

const TREASURY_ACCOUNT = stringToU8a('modlpy/trfin'.padEnd(32, '\0'));//融资
const TRMODEL_ACCOUNT = stringToU8a('modlpy/trmod'.padEnd(32, '\0'));//模型
const ACMODEL_ACCOUNT = stringToU8a('modlpy/acmod'.padEnd(32, '\0'));//模型
const TECHNOLOGY_ACCOUNT = stringToU8a('modlpy/trtch'.padEnd(32, '\0'));//技术


function Summary (): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();

  const treasuryBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TREASURY_ACCOUNT]);
  const trmodelBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TRMODEL_ACCOUNT]);
  const acmodelBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [ACMODEL_ACCOUNT]);
  const technologyBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TECHNOLOGY_ACCOUNT]);
  const totalIssuance = useCall<string>(api.query.balances?.totalIssuance);

  /* console.log("treasuryBalance:"+JSON.stringify(treasuryBalance));
   console.log("modelBalance:"+JSON.stringify(modelBalance));
   console.log("technologyBalance:"+JSON.stringify(technologyBalance)); */

   const value_fin = treasuryBalance?.freeBalance.gtn(0)
     ? treasuryBalance.freeBalance
     : null;
   const value_trmodel = trmodelBalance?.freeBalance.gtn(0)
     ? trmodelBalance.freeBalance
     : null;

   const value_acmodel = acmodelBalance?.freeBalance.gtn(0)
     ? acmodelBalance.freeBalance
     : null;
   const value_tech = technologyBalance?.freeBalance.gtn(0)
     ? technologyBalance.freeBalance
     : null;
  /* console.log("value_fin:"+value_fin);
   console.log("value_model:"+value_model);
   console.log("value_tech:"+value_tech); */

   //基金存量=融资余额+模型余额+技术开发余额
   let fundStock = BigInt(1);
   if(!!value_fin&&!!value_trmodel&&!!value_acmodel&&!!value_tech){
     fundStock=BigInt(value_fin+'')+(BigInt(value_trmodel+''))+(BigInt(value_acmodel+''))+(BigInt(value_tech+''));
     //console.log("fundStock:"+fundStock);
   }
   //基金发行量=10亿-基金存量
   let initial_issue_quantity = BigInt('100000000000000000000000');
   if(!!fundStock){
     initial_issue_quantity=initial_issue_quantity-fundStock;
     console.log("initial_issue_quantity:"+initial_issue_quantity);
   }
   //区块发行量=总发行量-10亿
   let block_issue = BigInt('100000000000000000000000');
   if(!!totalIssuance){
     console.log("totalIssuance:"+totalIssuance);
     block_issue=BigInt(totalIssuance+'')-block_issue;
     console.log("block_issue:"+block_issue);
   }

  return (
    <SummaryBox>
      <section>
        <CardSummary label={t<string>('last block')}>
          <TimeNow />
        </CardSummary>

        <CardSummary
          className='media--800'
          label={t<string>('target')}
        >
          <BlockToTime blocks={BN_ONE} />
        </CardSummary>
      </section>
      <section>
        {block_issue && (
          <CardSummary
            className='media--800'
            label={t<string>('Number of block issues')}
          >
            <FormatBalance
              value={block_issue}
              withSi
            />
          </CardSummary>

        )}
        {initial_issue_quantity && (
          <CardSummary
            className='media--800'
            label={t<string>('Initial issue quantity')}
          >
           <FormatBalance
             value={initial_issue_quantity}
             withSi
           />
          </CardSummary>

        )}
        {fundStock && (
          <CardSummary
            className='media--800'
            label={t<string>('Fund stock')}
          >
            <FormatBalance
              value={fundStock}
              withSi
            />
          </CardSummary>

        )}

      </section>
      <section className='media--1200'>

      </section>
      <section>
        <SummarySession withEra={false} />
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);

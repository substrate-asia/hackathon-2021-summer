// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveAppFinanceCountInfo} from '@polkadot/api-derive/types';

//import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
//import { formatNumber } from '@polkadot/util';
import { FormatBalance } from '@polkadot/react-query';

import { useTranslation } from '../translate';


interface Props {
   redeemCount?: number;
   income?: BN;
}


function Summary ({ redeemCount = 0, income }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const bestNumber = useCall<BN>(api.derive.chain.bestNumber);
  console.log("bestNumber:" + bestNumber);

  var totalSeconds = new BN(300);//当前周期设置为30分钟


  const appFinanceCountInfo = useCall<DeriveAppFinanceCountInfo>(api.derive.kp.appFinanceCountInfo);
  console.log("appFinanceCountInfo:" + JSON.stringify(appFinanceCountInfo));

  var currentSeconds = new BN(0);
  var totalBurn:string ='';
  let stage: Number = 0;
  if(!!appFinanceCountInfo){
     stage = appFinanceCountInfo.stage;
     if( stage == 0 ){
       totalSeconds = new BN(0);
       currentSeconds = new BN(0);
     }else if( stage == 1 ){
       totalSeconds = new BN(300);
       currentSeconds = new BN((1800-Number(appFinanceCountInfo.leftSeconds+''))+'');
     }else if( stage == 2 ){
       totalSeconds = new BN(150);
       currentSeconds = new BN((900-Number(appFinanceCountInfo.leftSeconds+''))+'');

     }else if( stage == 3 ){
       totalSeconds = new BN(150);
       currentSeconds = new BN((900-Number(appFinanceCountInfo.leftSeconds+''))+'');
     }
     console.log("totalBurn:"+appFinanceCountInfo.totalBurn);
     totalBurn = appFinanceCountInfo.totalBurn.toString();
  }
 console.log("totalSeconds:"+totalSeconds);
 console.log("currentSeconds:"+currentSeconds);
 const unit = new BN(6);
 if(!!totalSeconds && !!currentSeconds && totalSeconds!=0 && currentSeconds!=0){
   currentSeconds = currentSeconds.div(unit);
 }
 console.log("currentSeconds:"+currentSeconds);
 /* if(stage!=0){
   console.log("currentSeconds.mod(totalSeconds):"+(currentSeconds.mod(totalSeconds)));
   console.log("currentSeconds.mod(totalSeconds).addn(1):"+(currentSeconds.mod(totalSeconds).addn(1)));
 } */
  return (
    <SummaryBox>
      <section>
        <CardSummary label={t<string>('Number of redemption periods')}>
          {redeemCount}
        </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('Total redemption')}>
             {totalBurn}
         </CardSummary>
      </section>

      {appFinanceCountInfo && (stage == 0 ) &&(
        <section className='media--1100'>

        </section>
      )}
      {appFinanceCountInfo && (stage == 1 ) &&(
        <section className='media--1100'>
          <CardSummary
            label={t<string>('Redemption period')}
            progress={{
              total: totalSeconds ,
              value: currentSeconds.mod(totalSeconds).addn(1),
              withTime: true
            }}
          />
        </section>
      )}
      {appFinanceCountInfo && (stage == 2 ) &&(
        <section className='media--1100'>
          <CardSummary
            label={t<string>('confirming')}
            progress={{
              total: totalSeconds ,
              value: currentSeconds.mod(totalSeconds).addn(1),
              withTime: true
            }}
          />
        </section>
      )}
      {appFinanceCountInfo && (stage == 3 ) &&(
        <section className='media--1100'>
          <CardSummary
            label={t<string>('compensating')}
            progress={{
              total: totalSeconds ,
              value: currentSeconds.mod(totalSeconds).addn(1),
              withTime: true
            }}
          />
        </section>
      )}

    </SummaryBox>
  );
}

export default React.memo(Summary);

// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveAppFinanceCountInfo,DeriveModelCycleRewardTime} from '@polkadot/api-derive/types';

//import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
//import { formatNumber } from '@polkadot/util';
import { FormatBalance } from '@polkadot/react-query';

import { useTranslation } from '../translate';

const POLL_TIMEOUT = 1000;
interface Props {
  redeemCount?: number;
  income?: number;
}

async function stageInfo (api: ApiPromise): Promise<DeriveModelCycleRewardTime> {
  try {
    const stages = await Promise.all([
      api.derive.kp.modelCycleRewardStage()
    ]);

    return stages;
  } catch (error) {
    console.log("error:"+error);
    return [];
  }
}

function Summary ({ redeemCount = 0, income = 0 }: Props): React.ReactElement<Props> {//referendumCount ,
  const { t } = useTranslation();
  const { api } = useApi();
  const bestNumber = useCall<BN>(api.derive.chain.bestNumber);
  const [modelCycleRewardStage, setInfo] = useState<DeriveModelCycleRewardTime>({});
  //console.log("modelCycleRewardStage:" + JSON.stringify(modelCycleRewardStage));

 useEffect((): () => void => {
    const _getStage = (): void => {
      stageInfo(api).then(setInfo).catch(console.error);
    };

    _getStage();

    const timerId = window.setInterval((): void => {
      _getStage();
    }, POLL_TIMEOUT);

    return (): void => {
      window.clearInterval(timerId);
    };
  }, []);


  const appFinanceCountInfo = useCall<DeriveAppFinanceCountInfo>(api.derive.kp.appFinanceCountInfo);
 //console.log("appFinanceCountInfo:" + JSON.stringify(appFinanceCountInfo));

 //var currentSeconds = new BN(1);
  //var count: number = 0;
  var totalBurn:string ='';
  if(!!appFinanceCountInfo){
    // currentSeconds = new BN((300-Number(appFinanceCountInfo.leftSeconds+''))+'');
    // count = Number(appFinanceCountInfo.count+'');
   //  totalBurn = new BN(appFinanceCountInfo.totalBurn+'');//未格式化
    totalBurn = appFinanceCountInfo.totalBurn.toString();
  /*  var a: string = appFinanceCountInfo.totalBurn.toString().substring(0,appFinanceCountInfo.totalBurn.toString().length-4)+'';
    console.log("a:"+a);
    totalBurn = new BN(Number(a)+''); */
  }
  var total2 = new BN(600);//当前周期设置为1小时
 /* const modelCycleRewardStage = useCall<DeriveModelCycleRewardTime>(api.derive.kp.modelCycleRewardStage);

  console.log("modelCycleRewardStage:" + JSON.stringify(modelCycleRewardStage));
 */
  var total = new BN(1);
  let stage: Number = 0;
  const unit = new BN(6);
  if(!!modelCycleRewardStage){
    if(!!modelCycleRewardStage[0] && modelCycleRewardStage.length>0){
       stage = modelCycleRewardStage[0].stage.toNumber();
       if(stage==0){
         total = new BN((1800-modelCycleRewardStage[0].leftSeconds)+'');
         total2 = new BN(300);
       }else if(stage==1 || stage==2){
         total = new BN((600-modelCycleRewardStage[0].leftSeconds)+'');
         total2 = new BN(100);
       }else if(stage==3 || stage==4){
         total = new BN((300-modelCycleRewardStage[0].leftSeconds)+'');
         total2 = new BN(50);
       }
    }
     total = total.div(unit);
    // console.log("total:" + total);
    // console.log("stage:" + stage);
  }

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
      <section>
      </section>

     {total2 && total && (stage == 0 ) &&(
       <section className='media--1100'>
         <CardSummary
           label={t<string>('ordinary stage')}
           progress={{
             total: total2 ,
             value: total.mod(total2).addn(1),
             withTime: true
           }}
         />
       </section>
     )}
     {total2 && total && (stage == 1 ) &&(
       <section className='media--1100'>
         <CardSummary
           label={t<string>('statistical income stage')}
           progress={{
             total: total2 ,
             value: total.mod(total2).addn(1),
             withTime: true
           }}
         />
       </section>
     )}
     {total2 && total && (stage == 2 ) &&(
       <section className='media--1100'>
         <CardSummary
           label={t<string>('apply for award stage')}
           progress={{
             total: total2 ,
             value: total.mod(total2).addn(1),
             withTime: true
           }}
         />
       </section>
     )}
     {total2 && total && (stage == 3 ) &&(
       <section className='media--1100'>
         <CardSummary
           label={t<string>('confirming')}
           progress={{
             total: total2 ,
             value: total.mod(total2).addn(1),
             withTime: true
           }}
         />
       </section>
     )}
     {total2 && total && (stage == 4 ) &&(
       <section className='media--1100'>
         <CardSummary
           label={t<string>('compensating')}
           progress={{
             total: total2 ,
             value: total.mod(total2).addn(1),
             withTime: true
           }}
         />
       </section>
     )}

    </SummaryBox>
  );
}

export default React.memo(Summary);

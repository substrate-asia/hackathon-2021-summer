// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { DeriveBalancesAccount,DeriveModelCycleRewardTime } from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { formatNumber , stringToU8a} from '@polkadot/util';
import { FormatBalance } from '@polkadot/react-query';

import { useTranslation } from '../translate';

const TRMODEL_ACCOUNT = stringToU8a('modlpy/trmod'.padEnd(32, '\0'));//模型
const POLL_TIMEOUT = 1000;
interface Props {
  referendumCount?: number;
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

function Summary ({ referendumCount }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const activeProposals = useCall<unknown[]>(api.derive.democracy.proposals);
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

  const trmodelBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [TRMODEL_ACCOUNT]);

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

  var total2 = new BN(600);//当前周期设置为1小时




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

      }else if(stage==3 || stage==4){//3支付延长期 4赎回补偿期
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
        <CardSummary label={t<string>('Total issues (year)')}>
          {formatNumber(activeProposals?.length)}
        </CardSummary>
      </section>
      <section>
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
           <CardSummary label={t<string>('Initial issue quantity of model Additional')}>
             <FormatBalance
               value={0}
               withSi
             />
           </CardSummary>
         )

         }
      </section>
      <section>

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
      { total2 && total && (stage == 0 ) &&(
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

// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { DeriveModelDisputeSummary} from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

//import BN from 'bn.js';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';


interface Props {
  disputeSummary?: DeriveModelDisputeSummary;
}

function Summary ({ disputeSummary }: Props): React.ReactElement<Props> {

  const { t } = useTranslation();

  console.log("disputeSummary:"+ JSON.stringify(disputeSummary));

  return (
    <SummaryBox>
      <section>
        <CardSummary className='media--1000' label={t<string>('Total number of models')}>
           {formatNumber(disputeSummary?disputeSummary.total:0)}
        </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('General error')}>
            {formatNumber(disputeSummary?disputeSummary.lv0Count:0)}
         </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('More serious error')}>
            {formatNumber(disputeSummary?disputeSummary.lv1Count:0)}
         </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('Serious error')}>
            {formatNumber(disputeSummary?disputeSummary.lv2Count:0)}
         </CardSummary>
      </section>
      <section>
        
      </section>
      <section>
        
      </section>

    </SummaryBox>
  );
}

export default React.memo(Summary);

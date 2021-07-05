// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { DeriveAppSummary} from '@polkadot/api-derive/types';
//import { Balance } from '@polkadot/types/interfaces';

//import BN from 'bn.js';
import React from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';


interface Props {
  deriveAppSummary?: DeriveAppSummary;
}

function Summary ({ deriveAppSummary }: Props): React.ReactElement<Props> {

  const { t } = useTranslation();

  console.log("deriveAppSummary:"+ JSON.stringify(deriveAppSummary));

  return (
    <SummaryBox>
      <section>
        <CardSummary className='media--1000' label={t<string>('Total number of applications')}>
           {formatNumber(deriveAppSummary?deriveAppSummary.total:0)}
        </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('Commodity')}>
            {formatNumber(deriveAppSummary?deriveAppSummary.commodity:0)}
         </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('Service')}>
            {formatNumber(deriveAppSummary?deriveAppSummary.service:0)}
         </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('governance')}>
            {formatNumber(deriveAppSummary?deriveAppSummary.governance:0)}
         </CardSummary>
      </section>
      <section>
         <CardSummary className='media--1000' label={t<string>('Others')}>
            {formatNumber(deriveAppSummary?deriveAppSummary.others:0)}
         </CardSummary>
      </section>


    </SummaryBox>
  );
}

export default React.memo(Summary);

// Copyright 2017-2020 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

//import { DeriveBalancesAccount } from '@polkadot/api-derive/types';
import { PowerSize } from '@polkadot/types/interfaces';

import React from 'react';
import { useApi, useCall} from '@polkadot/react-hooks';

import { SummaryBox, CardSummary } from '@polkadot/react-components';
import {  TotalKP  } from '@polkadot/react-query';

import { useTranslation } from './translate';

//import { DeriveAccountPowers } from '@polkadot/api-derive/types';

function Summary (): React.ReactElement {
  const { t } = useTranslation();
  const { api } = useApi();
  const totalPower = useCall<PowerSize>(api.query.kp.totalPower);
  console.log('totalPower11:', totalPower?.toJSON());



  return (
    <SummaryBox>
      <section>

      </section>
      <section>
        {totalPower && (
          <CardSummary
            className='media--800'
            label={t<string>('KP total')}
          >
            <TotalKP />
          </CardSummary>

        )}
      </section>
      <section className='media--1200'>
      </section>
      <section className='media--1200'>
      </section>
      <section >
      </section>

    </SummaryBox>
  );
}

export default React.memo(Summary);

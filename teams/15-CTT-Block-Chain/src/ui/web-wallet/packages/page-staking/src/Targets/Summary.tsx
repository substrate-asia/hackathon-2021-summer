// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Balance } from '@polkadot/types/interfaces';
import { DeriveBalancesAccount } from '@polkadot/api-derive/types';

import BN from 'bn.js';
import React, { useMemo } from 'react';
import { SummaryBox, CardSummary } from '@polkadot/react-components';
import { calcInflation, useInflation, useApi, useCall } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { stringToU8a } from '@polkadot/util';

import { useTranslation } from '../translate';

const FUND_FIN_ACCOUNT = stringToU8a('modlpy/trfin'.padEnd(32, '\0'));
const FUND_MOD_ACCOUNT = stringToU8a('modlpy/trmod'.padEnd(32, '\0'));
const FUND_TCH_ACCOUNT = stringToU8a('modlpy/trtch'.padEnd(32, '\0'));
const FUND_AMOD_ACCOUNT = stringToU8a('modlpy/acmod'.padEnd(32, '\0'));

interface Props {
  avgStaked?: BN;
  lowStaked?: BN;
  lastReward?: BN;
  numNominators?: number;
  numValidators?: number;
  totalStaked?: BN;
}

function Summary ({ avgStaked, lastReward, lowStaked, numNominators, numValidators, totalStaked }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const totalIssuance = useCall<Balance>(api.query.balances?.totalIssuance);
  const fundFinBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [FUND_FIN_ACCOUNT]);
  const fundModBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [FUND_MOD_ACCOUNT]);
  const fundTchBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [FUND_TCH_ACCOUNT]);
  const fundAmodBalance = useCall<DeriveBalancesAccount>(api.derive.balances.account, [FUND_AMOD_ACCOUNT]);
  const ZERO = new BN(0);
  const fundBalance = (fundFinBalance ? fundFinBalance.freeBalance : ZERO)
    .add(fundModBalance ? fundModBalance.freeBalance : ZERO)
    .add(fundTchBalance ? fundTchBalance.freeBalance : ZERO)
    .add(fundAmodBalance ? fundAmodBalance.freeBalance : ZERO);
  const totalCash = totalIssuance?.sub(fundBalance);

  const inflation = useInflation(totalStaked);

  console.log('inflation:', inflation);

  const progressStake = useMemo(
    () => totalCash && totalStaked && totalStaked.gtn(0)
      ? {
        hideValue: true,
        total: totalCash,
        value: totalStaked
      }
      : undefined,
    [totalCash, totalStaked]
  );

  const progressAvg = useMemo(
    () => avgStaked && lowStaked && avgStaked.gtn(0)
      ? {
        hideValue: true,
        total: avgStaked,
        value: lowStaked
      }
      : undefined,
    [avgStaked, lowStaked]
  );

  return (
    <SummaryBox>
      <section className='media--800'>
        {totalCash && (
          <CardSummary
            label={`${totalStaked?.gtn(0) ? `${t<string>('total staked')} / ` : ''}${t<string>('circulation')}`}
            progress={progressStake}
          >
            <div>
              {totalStaked?.gtn(0) && (
                <>
                  <FormatBalance
                    value={totalStaked}
                    withCurrency={false}
                    withSi
                  />
                 &nbsp;/&nbsp;
                </>
              )}
              <FormatBalance
                value={totalCash}
                withSi
              />
            </div>
          </CardSummary>
        )}

      </section>
      {avgStaked && lowStaked && (
        <CardSummary
          className='media--1000'
          label={`${t<string>('lowest / avg staked')}`}
          progress={progressAvg}
        >
          <FormatBalance
            value={lowStaked}
            withCurrency={false}
            withSi
          />
          &nbsp;/&nbsp;
          <FormatBalance
            value={avgStaked}
            withSi
          />
        </CardSummary>
      )}
      {numValidators && numNominators && (
        <CardSummary
          className='media--1600'
          label={`${t<string>('nominators')} / ${t<string>('validators')}`}
        >
          {numNominators}&nbsp;/&nbsp;{numValidators}
        </CardSummary>
      )}
      {lastReward?.gtn(0) && (
        <CardSummary label={t<string>('last reward')}>
          <FormatBalance
            value={lastReward}
            withSi
          />
        </CardSummary>
      )}
    </SummaryBox>
  );
}

export default React.memo(Summary);

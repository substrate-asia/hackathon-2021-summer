// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@polkadot/api';
import type { Inflation } from './types';

import BN from 'bn.js';
import { useEffect, useState } from 'react';

//import { getInflationParams } from '@polkadot/apps-config';

import { useApi } from './useApi';
import { useCall } from './useCall';

export function calcInflation (api: ApiPromise, totalStaked: BN, totalIssuance: BN): Inflation {
  //const { falloff, idealStake, maxInflation, minInflation } = getInflationParams(api);
  const { falloff, idealStake, maxInflation, minInflation } = {
    falloff: 0.05,
    idealStake: 0.75,
    maxInflation: 0.1,
    minInflation: 0.025
  };

  const stakedFraction = totalStaked.muln(1_000_000).div(totalIssuance).toNumber() / 1_000_000;
  const idealInterest = maxInflation / idealStake;
  const inflation = 100 * (minInflation + (
    stakedFraction <= idealStake
      ? (stakedFraction * (idealInterest - (minInflation / idealStake)))
      : (((idealInterest * idealStake) - minInflation) * Math.pow(2, (idealStake - stakedFraction) / falloff))
  ));

  console.log(`calcInflation: totalStaked:${totalStaked.toString()}, totalIssuance:${totalIssuance.toString()}, stakedFraction: ${stakedFraction.toString()}, idealInterest:${idealInterest.toString()}`);

  return {
    inflation,
    stakedReturn: inflation / stakedFraction
  };
}

export function useInflation (totalStaked?: BN): Inflation {
  const { api } = useApi();
  const totalIssuance = useCall<BN>(api.derive.kp.currentIssuance);
  console.log(`useInflation: totalIssuance:${totalIssuance?.toString()}, totalStaked:${totalStaked?.toString()}`);
  const [state, setState] = useState<Inflation>({ inflation: 0, stakedReturn: 0 });

  useEffect((): void => {
    totalIssuance && totalStaked && setState(
      calcInflation(api, totalStaked, totalIssuance)
    );
  }, [api, totalIssuance, totalStaked]);

  return state;
}

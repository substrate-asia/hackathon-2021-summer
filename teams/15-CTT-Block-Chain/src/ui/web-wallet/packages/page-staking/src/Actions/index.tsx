// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StakerState } from '@polkadot/react-hooks/types';
//import { StakingLedger } from '@polkadot/types/interfaces';
import { SortedTargets } from '../types';

import BN from 'bn.js';
import React, { useMemo, useRef } from 'react';
import { Button, Table } from '@polkadot/react-components';
import { useAvailableSlashes } from '@polkadot/react-hooks';

import ElectionBanner from '../ElectionBanner';
import { useTranslation } from '../translate';
import Account from './Account';
import NewNominator from './NewNominator';
import NewStash from './NewStash';
import NewValidator from './NewValidator';

interface Props {
  className?: string;
  isInElection?: boolean;
  ownStashes?: StakerState[];
  next?: string[];
  validators?: string[];
  targets: SortedTargets;
}

interface State {
  bondedTotal?: BN;
  foundStashes?: StakerState[];
}

function sortStashes (a: StakerState, b: StakerState): number {
  return (a.isStashValidating ? 1 : (a.isStashNominating ? 5 : 99)) - (b.isStashValidating ? 1 : (b.isStashNominating ? 5 : 99));
}


function extractState ( ownStashes?: StakerState[]): State {
  var bondedTotal = new BN(0);
  var foundStashes: StakerState[];
  if (!ownStashes) {
    return {};
  }else{
    foundStashes = ownStashes.sort(sortStashes);
  }
  return {
    bondedTotal: bondedTotal,
    foundStashes: foundStashes
  };
}

function Actions ({ className = '', isInElection, ownStashes, targets }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const allSlashes = useAvailableSlashes();
  
  const headerRef = useRef([
    [t('stashes'), 'start', 2],
    [t('controller'), 'address'],
    [t('rewards'), 'start media--1200'],
    [t('bonded'), 'number'],
    [undefined, undefined, 2]
  ]);

  const { bondedTotal, foundStashes } = useMemo(
    () => extractState( ownStashes),
    [ownStashes]
  ); 
  console.log("bondedTotal:"+bondedTotal);
  const footer = useMemo(() => (
    <tr>
      <td colSpan={4} />
      <td className='number'>

      </td>
      <td colSpan={2} />
    </tr>
  ), []);

  return (
    <div className={className}>
      <Button.Group>
        <NewNominator
          isInElection={isInElection}
          targets={targets}
        />
        <NewValidator isInElection={isInElection} />
        <NewStash />
      </Button.Group>
      <ElectionBanner isInElection={isInElection} />
      <Table
        empty={foundStashes && t<string>('No funds staked yet. Bond funds to validate or nominate a validator')}
        footer={footer}
        header={headerRef.current}
      >
        {foundStashes?.map((info): React.ReactNode => (
          <Account
            allSlashes={allSlashes}
            info={info}
            isDisabled={isInElection}
            key={info.stashId}
            targets={targets}
          />
        ))}
      </Table>
    </div>
  );
}

export default React.memo(Actions);

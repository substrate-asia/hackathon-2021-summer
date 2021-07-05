// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';

import React from 'react';
import { LockedVote } from '@polkadot/react-query';

import { classes } from './util';

export interface Props {
  powerRatio?: string;
  intoType?: string;
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
  withLabel?: boolean;
}

function LockedVoteDisplay (props: Props): React.ReactElement<Props> | null {
  const {powerRatio = '', intoType = '', className = '', label, params  } = props;

  if (!params) {
    return null;
  }

  return (
    <LockedVote
      powerRatio={powerRatio}
      intoType={intoType}
      className={classes('ui--LockedVote', className)}
      label={label}
      params={params}
    />
  );
}

export default React.memo(LockedVoteDisplay);

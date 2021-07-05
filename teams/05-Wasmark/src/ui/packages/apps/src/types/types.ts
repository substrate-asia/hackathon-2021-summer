// Copyright 2017-2021 @polkadot/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';

export interface UseWeight {
  executionTime: number;
  isEmpty: boolean;
  isValid: boolean;
  megaGas: BN;
  percentage: number;
  setIsEmpty: React.Dispatch<boolean>
  setMegaGas: React.Dispatch<BN | undefined>;
  weight: BN;
}

// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Component, { useCounter } from '@ctt/app-redeem';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'exchange-alt',
    name: 'redeem',
    text: t('nav.redeem', 'Redeem', { ns: 'apps-routing' }),
    useCounter
  };
}

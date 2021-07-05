// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Component from '@ctt/app-data-statistics';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'chain_application',
    icon: 'chart-bar',
    name: 'data_statistics',
    text: t('nav.data_statistics', 'Data Statistics', { ns: 'apps-routing' })
  };
}

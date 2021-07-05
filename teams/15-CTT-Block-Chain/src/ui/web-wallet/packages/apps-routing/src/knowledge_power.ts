// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Component from '@ctt/app-knowledge-power';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'chain_application',
    icon: 'book',
    name: 'knowledge_power',
    text: t('nav.knowledge_power', 'Knowledge Power', { ns: 'apps-routing' }),
  };
}

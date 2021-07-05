// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Component from '@ctt/app-chain-application-manage';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'chain_application',
    icon: 'mobile',
    name: 'chain_application_manage',
    text: t('nav.chain_application_manage', 'Chain Application Manage', { ns: 'apps-routing' }),
    //useCounter
  };
}

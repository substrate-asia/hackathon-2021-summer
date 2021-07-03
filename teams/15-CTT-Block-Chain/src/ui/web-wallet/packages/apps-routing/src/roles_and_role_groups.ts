// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Route } from './types';

import Component from '@ctt/app-roles-and-role-groups';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'chain_application',
    icon: 'user-friends',
    name: 'roles_and_role_groups',
    text: t('nav.roles_and_role_groups', 'Roles And Role Groups', { ns: 'apps-routing' })
  };
}

// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TFunction } from 'i18next';
import { Routes } from './types';

import accounts from './accounts';
import redeem from './redeem';
import addresses from './addresses';
import calendar from './calendar';
import claims from './claims';
import contracts from './contracts';
import council from './council';
import democracy from './democracy';
import explorer from './explorer';
import extrinsics from './extrinsics';
import genericAsset from './generic-asset';
import js from './js';
import parachains from './parachains';
import poll from './poll';
import rpc from './rpc';
import settings from './settings';
import signing from './signing';
import society from './society';
import staking from './staking';
import storage from './storage';
import sudo from './sudo';
import techcomm from './techcomm';
import transfer from './transfer';
import treasury from './treasury';
//import chain_application from './chain_application';
import chain_application1 from './chain_application1';
import knowledge_power from './knowledge_power';
import competitive_list from './competitive_list';
//import roles_and_role_groups from './roles_and_role_groups';
import data_statistics from './data_statistics';

export default function create (t: TFunction): Routes {
  return [
    accounts(t),
    addresses(t),
    explorer(t),
    claims(t),
    poll(t),
    transfer(t),
    redeem(t),
    genericAsset(t),
    staking(t),
    democracy(t),
    council(t),
    treasury(t),
    techcomm(t),
    parachains(t),
    society(t),
    calendar(t),
    contracts(t),
    storage(t),
    extrinsics(t),
    rpc(t),
    signing(t),
    sudo(t),
    js(t),
    settings(t),
    chain_application1(t),
    knowledge_power(t),
    // chain_application(t),
     competitive_list(t),
     //roles_and_role_groups(t),
     data_statistics(t),
  ];
}

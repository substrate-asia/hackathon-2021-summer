// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AppProps as Props } from '@polkadot/react-components/types';

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { useAccounts, useIpfs } from '@polkadot/react-hooks';
import { HelpOverlay, Tabs } from '@polkadot/react-components';

import basicMd from './md/basic.md';
import { useTranslation } from './translate';
import useCounter from './useCounter';
import ModelKptIssuance from './ModelKptIssuance';
import KptRedemption from './KptRedemption';
import ModelReview from './ModelReview';

export { useCounter };

const HIDDEN_ACC = ['vanity'];

function AccountsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const { isIpfs } = useIpfs();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'modelKptIssuance',
      text: t<string>('Model kpt issuance')
    },
    {
      name: 'kptRedemption',
      text: t<string>('Model create')
    }
    ,
    {
      name: 'modelReview',
      text: t<string>('Model review')
    }
  ]);

  return (
    <main className='accounts--App'>
      <HelpOverlay md={basicMd as string} />
      <header>
        <Tabs
          basePath={basePath}
          hidden={(hasAccounts && !isIpfs) ? undefined : HIDDEN_ACC}
          items={itemsRef.current}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/ModelReview`}>
          <ModelReview
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route path={`${basePath}/KptRedemption`}>
          <KptRedemption
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route>
          <ModelKptIssuance
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AccountsApp);

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
import Accounts from './Accounts';
import ExpErienceGoodsKP from './ExpErienceGoodsKP';
import DocumentKP from './DocumentKP';
import CompetitiveReviewParticipation from './CompetitiveReviewParticipation';

export { useCounter };

const HIDDEN_ACC = ['vanity'];

function AccountsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { hasAccounts } = useAccounts();
  const { isIpfs } = useIpfs();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'accountKP',
      text: t<string>('Account KP')
    },
    {
      name: 'experienceGoodsKP',
      text: t<string>('Experience goods KP')
    },
    {
      name: 'documentKP',
      text: t<string>('Document KP')
    },
    {
      name: 'competitiveReviewParticipation',
      text: t<string>('Competitive review participation')
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
        <Route path={`${basePath}/CompetitiveReviewParticipation`}>
          <CompetitiveReviewParticipation
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route path={`${basePath}/DocumentKP`}>
          <DocumentKP
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route path={`${basePath}/ExpErienceGoodsKP`}>
          <ExpErienceGoodsKP
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
        <Route>
          <Accounts
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AccountsApp);

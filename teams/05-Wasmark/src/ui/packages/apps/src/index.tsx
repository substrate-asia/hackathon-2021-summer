// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

// setup these right at front
import 'semantic-ui-css/semantic.min.css';
import '@polkadot/react-components/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Apps';
import { InitialParamsProvider, ContractsProvider, AccountsProvider } from './core/providers';
import { BrowserRouter } from 'react-router-dom';
import { Api } from '@polkadot/react-api';
import GlobalStyle from '@polkadot/react-components/styles';
import Root from './Root';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

ReactDOM.render(
  <Root />,
  rootElement
);

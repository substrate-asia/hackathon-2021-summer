import type { ThemeDef } from '@polkadot/react-components/types';
import type { KeyringStore } from '@polkadot/ui-keyring/types';

import React, { Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { Api } from '@polkadot/react-api';
import { settings } from '@polkadot/ui-settings';

import Apps from './Apps';
import { darkTheme, lightTheme } from './themes';
import WindowDimensions from './WindowDimensions';
import { AccountsProvider, BenchmarkProvider, ContractsProvider, InitialParamsProvider } from './core';

interface Props {
  store?: KeyringStore;
}

function createTheme ({ uiTheme }: { uiTheme: string }): ThemeDef {
  const validTheme = uiTheme === 'dark' ? 'dark' : 'light';

  document && document.documentElement &&
    document.documentElement.setAttribute('data-theme', validTheme);

  return uiTheme === 'dark'
    ? darkTheme
    : lightTheme;
}

function Root ({ store }: Props): React.ReactElement<Props> {
  const [theme, setTheme] = useState(() => createTheme(settings));

  useEffect((): void => {
    settings.on('change', (settings) => setTheme(createTheme(settings)));
  }, []);

  return (
    <Suspense fallback='...'>
      <ThemeProvider theme={theme}>
          <Api
            store={store}
          >
            <InitialParamsProvider>
              <ContractsProvider>
                <BrowserRouter>
                  <AccountsProvider>
                    <BenchmarkProvider>
                      <BrowserRouter>
                        <WindowDimensions>
                          <Apps />
                        </WindowDimensions>
                      </BrowserRouter>
                    </BenchmarkProvider>
                  </AccountsProvider>
                </BrowserRouter>
              </ContractsProvider>
            </InitialParamsProvider>
          </Api>
      </ThemeProvider>
    </Suspense>
  );
}

export default React.memo(Root);

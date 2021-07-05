import { Style } from '@polkadot/apps-config/ui/colors';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import Home from './pages/Home';
import Test from './pages/Test';
import GlobalStyle from '@polkadot/react-components/styles';
import { ThemeDef } from '@polkadot/react-components/types';
import { useApi } from '@polkadot/react-hooks';
import { getSystemColor } from '@polkadot/apps-config';
import PreTest from './pages/Test/PreTest';

const App: FC<{ className?: string }> = ({ className }) => {
  const { theme } = useContext<ThemeDef>(ThemeContext);
  const { isDevelopment, specName, systemChain, systemName } = useApi();

  const uiHighlight = useMemo(
    () => isDevelopment
      ? undefined
      : getSystemColor(systemChain, systemName, specName),
    [isDevelopment, specName, systemChain, systemName]
  );

  return (
    <div className={`apps--Wrapper theme--${theme} ${className}`}>
      <GlobalStyle uiHighlight={uiHighlight} />
      <div className={className}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/test" exact>
            <Test />
          </Route>
          <Route path="/test/pre">
            <PreTest />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default styled(App)`
  min-height: 100%;
  background-color: ${Style.color.bg.default};
`;
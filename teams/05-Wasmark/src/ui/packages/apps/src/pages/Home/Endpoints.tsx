import { Style } from '@polkadot/apps-config/ui/colors';
import { InitialParamsContext } from '../../core';
import React, { useContext } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Radio } from 'semantic-ui-react'
import { ApiContext } from '@polkadot/react-api';

const Endpoints: FC<{ className?: string }> = ({ className }) => {
  const { initialTestParams } = useContext(InitialParamsContext);
  const { isApiReady } = useContext(ApiContext);

  return (
    <div className={className}>
      <h3>Endpoint</h3>
      <div>
        <Radio checked={isApiReady} />
        <span>{initialTestParams?.endpoint}</span>
      </div>
    </div>
  );
}

export default styled(Endpoints)`
  height: 70px;
  padding: 1rem;
  border: 1px dashed #DEDEDE;
  background: #F8F8F8;
  margin-bottom: 2rem;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 1rem;
    }
  }
`;
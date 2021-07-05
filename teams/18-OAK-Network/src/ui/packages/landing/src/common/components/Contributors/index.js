import React from 'react';

import _ from 'lodash';

import ContributorsStyle from './contributors.style';
import { ellipsisAddress, unitToNumber } from 'common/utils';
import config from '../../../config';

const { oak } = config;

const Contributors = ({ contributions, ...props }) => {
  return (
    <ContributorsStyle {...props}>
      {_.map(contributions, (item) => {
        return (
          <div
            style={{
              margin: '30px',
              padding: '20px',
              border: '1px solid #f1f4f6',
            }}
          >
            <span>Account: {ellipsisAddress(item.account_id)}</span>
            <span style={{ marginLeft: '100px' }}>
              Value: {unitToNumber(item.value)} {oak.symbol}
            </span>
          </div>
        );
      })}
    </ContributorsStyle>
  );
};

export default Contributors;

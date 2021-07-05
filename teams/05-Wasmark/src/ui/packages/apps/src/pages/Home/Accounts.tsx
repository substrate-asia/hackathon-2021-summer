import React, { useContext } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Style } from '@polkadot/apps-config/ui/colors';
import { AccountsContext } from '../../core';

const Accounts: FC<{ className?: string }> = ({ className }) => {
  const { accounts } = useContext(AccountsContext);

  return (
    <div className={className}>
      <h3>Accounts</h3>
      {
        accounts.map(account =>
          <div className="account" key={account.address}>
            <div className="address">{account.address}</div>
            <div className="mnemonic">{account.mnemonic}</div>
          </div>
        )
      }
    </div>
  );
}

export default styled(Accounts)`
  padding: 1rem;
  border: 1px dashed ${Style.color.border.default};

  > .account {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0rem;
    }

    > .mnemonic {
      font-weight: 600;
      color: #2A292B;
    }
  }

`;
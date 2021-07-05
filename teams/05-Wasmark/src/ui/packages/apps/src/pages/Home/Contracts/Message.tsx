import { Style } from '@polkadot/apps-config/ui/colors';
import React, { useState } from 'react';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import type { AbiMessage } from '@polkadot/api-contract/types';
import type { Abi } from '@polkadot/api-contract';
import { Available, InputAddress } from '@polkadot/react-components';
import { useAccountId, useNonZeroBn } from '@polkadot/react-hooks';
import { MessageValue } from './Contract';
import useWeight from '../../../core/hooks/useWeight';
import { ENDOWMENT } from './Deploy';
import BN from 'bn.js';
import Params from '../../../shared/Params';
// import { BN_ONE } from '@polkadot/util';

// const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

const Message: FC<{
  className?: string;
  message: AbiMessage;
  expanded: boolean;
  abi: Abi;
  onChoose: () => void;
  onChange: (message: MessageValue) => void;
}> = ({ className, message, onChoose, onChange, abi, expanded}) => {
  const [params, setParams] = useState<any[]>([]);
  const [accountId, setAccountId] = useAccountId();
  const [endowment, isEndowmentValid, setEndowment] = useNonZeroBn(ENDOWMENT);
  const weight = useWeight();

  useEffect(() => {
    expanded && onChange({
      message,
      params,
      sender: (message.isMutating && accountId) || undefined,
    })
  }, [params, accountId, expanded]);

  return (
    <div className={className}>
      <div className="title" onClick={onChoose}>
        <div>
          <span className="message-type">{message.isMutating ? 'exec' : 'query'}</span>
          <span className="identifier">{message.identifier}</span>
        </div>
        <div className={ expanded ? 'choosed' : 'not-choosed' }></div>
      </div>
      {
        expanded &&
          <div className="message-params">
            {
              message.isMutating &&
                <InputAddress
                  defaultValue={accountId}
                  help='Specify the user account to use for this contract call. And fees will be deducted from this account.'
                  label='call from account'
                  labelExtra={
                    <Available
                      label='transferrable'
                      params={accountId}
                    />
                  }
                  onChange={setAccountId}
                  type='account'
                  value={accountId}
                />
            }
            <Params
              onChange={setParams}
              params={
                message
                  ? message.args
                  : undefined
              }
              registry={abi.registry as any}
            />
            {/* {message.isPayable && (
              <InputBalance
                help='The allotted value for this contract, i.e. the amount transferred to the contract as part of this call.'
                isError={!isEndowmentValid}
                isZeroable
                label='value'
                onChange={setEndowment}
                value={endowment}
              />
            )}
            <InputMegaGas
              help='The maximum amount of gas to use for this contract call. If the call requires more, it will fail.'
              isCall={!message.isMutating}
              weight={weight}
            /> */}
          </div>
      }
    </div>
  );
}

export default styled(Message)`
  border: 1px solid ${Style.color.border.default};
  margin-bottom: 20px;
  background-color: white;

  &:last-child {
    margin-bottom: 0px;
  }
  > .title {
    position: relative;
    cursor: pointer;
    display: flex;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    color: ${Style.color.label.primary};
    
    .message-type {
      display: inline-block;
      width: 80px;
      margin-right: 10px;
    }    
    .identifier {
      margin-right: 10px;
    }

    .choosed, .not-choosed {
      height: 30px;
      width: 60px;
      position: absolute;
      right: 1.75rem;
      top: 9px;
    }
    .choosed {
      background: ${Style.color.button.primary};
    }
    .not-choosed {
      background: ${Style.color.button.disabled};
    }
  }
  > .message-params {
    padding: 1.75rem;
    background: ${Style.color.bg.second};
  }
`;
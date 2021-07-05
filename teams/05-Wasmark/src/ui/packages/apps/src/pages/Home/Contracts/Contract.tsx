import { Style } from '@polkadot/apps-config/ui/colors';
import type { Code } from '../../../core';
import React, { useCallback, useMemo, useState } from 'react';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';
import type { AbiMessage } from '@polkadot/api-contract/types';
import { Dropdown, Input } from '@polkadot/react-components';
import Button from '@polkadot/react-components/Button/Button';
import Deploy from './Deploy';

export interface MessageValue {
  message: AbiMessage;
  params: any[];
  sender?: string;
}

export interface ContractBenchmark {
  message?: MessageValue;
  address?: string;
}

const Contract: FC<{
  className?: string;
  code: Code;
  expanded?: boolean;
  onChange: (extrinsics: ContractBenchmark) => void;
  onChoosed: () => void;
}> = ({ className, code, expanded, onChange, onChoosed }) => {
  const [ deployedContractOptions, setDeployedContractOptions ] = useState<{
    info: string;
    key: string;
    text: string;
    value: string;
  }[]>([]);
  const [ contractAddressInput, setContractAddressInput ] = useState<string>();
  const [ choosedMessageValue, setChoosedMessageValue ] = useState<MessageValue>();
  const [ choosedMessageIndentifer, setChoosedMessageIndentifer ] = useState<string>();
  const [ choosedContractAddress, setChoosedContractAddress ] = useState<string>();

  const execMessages = useMemo(
    () => code.abi.messages.filter(message => message.isMutating),
    [code],
  );
  const queryMessages = useMemo(
    () => code.abi.messages.filter(message => !message.isMutating),
    [code],
  );

  useEffect(() => {
    onChange({
      message: choosedMessageValue,
      address: choosedContractAddress 
    });
  }, [choosedMessageValue, choosedContractAddress]);

  return (
    <div className={className}>
      <div className="title" onClick={() => {
        onChoosed();
      }}>
        <div>
          <span className="code-name">{code.name}</span>
          <div className={ expanded ? 'choosed' : 'not-choosed' }></div>
        </div>
      </div>
      {
        expanded &&
          <div className="message-list">
            <div className="contract-address">
              <div className="address-area">
                <div style={{ width: '50%', marginRight: '1rem' }}>
                  <Input label="input new contrat address" value={contractAddressInput} onChange={setContractAddressInput} />
                </div>
                <div style={{ width: '25%' }} className="address-col">
                  <Button
                    icon='plus'
                    isDisabled={false}
                    label='Add contract address'
                    onClick={() => setDeployedContractOptions(options => {
                      if (!!options.find(o => o.key === contractAddressInput)) {
                        return options;
                      }
                      setContractAddressInput('');

                      return [...options, {
                        info: '',
                        key: contractAddressInput || '',
                        text: contractAddressInput || '',
                        value: contractAddressInput || '',
                      }];
                    })}
                  />
                </div>
                <div style={{ width: '25%' }} className="address-col">
                  <Deploy abi={code.abi} addContractAddress={address => setDeployedContractOptions(old => ([...old, {
                    info: '',
                    key: address || '',
                    text: address || '',
                    value: address || '',
                  }]))} />
                </div>
              </div>
              <Dropdown onChange={setChoosedContractAddress} label="select contract address" options={deployedContractOptions} />
            </div>
            {
              execMessages.map(message =>
                <Message
                  abi={code.abi}
                  key={message.identifier}
                  message={message}
                  expanded={choosedMessageIndentifer === message.identifier}
                  onChoose={() => setChoosedMessageIndentifer(message.identifier)}
                  onChange={setChoosedMessageValue}
                />
              )
            }
            {
              queryMessages.map(message =>
                <Message
                  abi={code.abi}
                  key={message.identifier}
                  message={message}
                  expanded={choosedMessageIndentifer === message.identifier}
                  onChoose={() => setChoosedMessageIndentifer(message.identifier)}
                  onChange={setChoosedMessageValue}
                />
              )
            }
          </div>
      }
    </div>
  );
}

export default styled(Contract)`
  border: 1px solid ${Style.color.border.default};
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }

  > .title {
    background-color: ${Style.color.bg.second};
    position: relative;
    border-bottom: 1px solid ${Style.color.border.default};
    cursor: pointer;
    display: flex;
    height: 48px;
    align-items: center;
    padding: 0px 20px;
    color: ${Style.color.label.primary};
    
    .code-name {
      margin-right: 10px;
      font-weight: 600;
      font-size: 1.2rem;
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

  .message-list {
    padding: 20px 21px;
    background: ${Style.color.bg.default};

    > .contract-address {
      margin-bottom: 20px;

      .address-area {
        display: flex;

        .address-col {
          height: 55px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
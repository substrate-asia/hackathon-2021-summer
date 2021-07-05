import { Style } from '@polkadot/apps-config/ui/colors';
import { AccountsContext, ContractsContext } from '../../../core/providers';
import React, { useCallback, useContext, useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import Contract, { ContractBenchmark } from './Contract';
import Button from '@polkadot/react-components/Button/Button';
import { useApi } from '@polkadot/react-hooks';
import PreModal from './PreModal';
import BN from 'bn.js';
import { ContractPromise } from '@polkadot/api-contract';
import type { Codec, IExtrinsic, IMethod, TypeDef } from '@polkadot/types/types';
import { getTypeDef, GenericCall } from '@polkadot/types';
import type { Call } from '@polkadot/types/interfaces/runtime';
import { keyring } from '@polkadot/ui-keyring';
import { handleTxResultsNoQueen } from '@polkadot/react-signer/util';

const READ_ADDR = '0x'.padEnd(66, '0');

interface Param {
  name: string;
  type: TypeDef;
}

interface Value {
  isValid: boolean;
  value: Codec;
}
function extractState (value: IExtrinsic | IMethod) {
  const params = GenericCall.filterOrigin(value.meta).map(({ name, type }): Param => ({
    name: name.toString(),
    type: getTypeDef(type.toString())
  }));
  const values = value.args.map((value): Value => ({
    isValid: true,
    value
  }));


  return { params, values };
}

const Contracts: FC<{ className?: string }> = ({ className }) => {
  const { codes } = useContext(ContractsContext);
  const [ testData, setTestData ] = useState<ContractBenchmark>();
  const [ choosedContractIndex, setChoosedContractIndex ] = useState<number>();
  const [ showPre, setShowPre ] = useState<boolean>();
  const { api } = useApi();
  const { accounts } = useContext(AccountsContext);
  
  const onStart_ = useCallback(async () => {
    const { tokenDecimals } = await api.rpc.system.properties();
    const decimals = tokenDecimals.toHuman() as string[];
    const decimal = parseInt(decimals[0]);

    if (choosedContractIndex === undefined || !testData || !testData.message || !testData.address || !testData!.message!.sender) {
      return;
    }
    const { nonce } = await api.query.system.account(testData!.message!.sender);

    const code = codes[choosedContractIndex];
    const method = testData.message.message.method;
    const endowment = (new BN(10)).mul(
      (new BN(1)).pow(new BN(decimal)
    ));
    const gasLimit = (new BN(200000)).mul(new BN(1000000));

    const contractPromise = new ContractPromise(api, code.abi, testData.address);

    [1,1,1].forEach(async (_, index) => {
        if (!testData!.message!.sender) {
          try {
            const query = await contractPromise.query[method](READ_ADDR, {}, ...testData!.message!.params);
            console.log('query', method, query.output?.toHuman())
          } catch (e) {}

          return;
        }

        const tx = contractPromise.tx[method]({
          gasLimit,
          value: 0,
        }, ...testData!.message!.params);
        
        const hex = tx.toHex();
        let extrinsicCall: Call;
  
        try {
          // cater for an extrinsic input...
          extrinsicCall = api.createType('Call', api.tx(hex).method);
        } catch (e) {
          extrinsicCall = api.createType('Call', hex);
        }
  
        const { params, values } = extractState(extrinsicCall);
        const dataIndex = params.findIndex(p => p.name === 'data');
        const data = values[dataIndex].value.toHex();
        const rawTx = api.tx.contracts.call(testData!.address!, endowment, gasLimit, data);

        const account = accounts.find(account => testData!.message!.sender &&
          keyring.encodeAddress(keyring.decodeAddress(account.address), 0) ===
            keyring.encodeAddress(keyring.decodeAddress(testData!.message!.sender), 0)
        )
        console.log('sender account', account)
        if (!account) {
          return;
        }

        const pair = keyring.createFromUri(account.mnemonic);

        rawTx.signAndSend(pair, {
          nonce: nonce.toNumber() + index + 1,
        }, handleTxResultsNoQueen('signAndSend', {
          txSuccessCb(status) {
            console.log('exec success', method, status)
          },
          txFailedCb(status) {
            console.log('exec failed', method, status)
          },
          txUpdateCb(status) {
            console.log('exec update status', status);
          }
        }, () => {}));
    });
  }, [testData, choosedContractIndex, api, accounts, codes]);

  const onStart = useCallback(() => {
    console.log('choosedContract and message', choosedContractIndex, testData)
    console.log(choosedContractIndex === undefined,
      !testData,
      !testData?.address,
      !testData?.message,
      (!testData?.message?.sender && testData?.message?.message.isMutating)
    )
    if (choosedContractIndex === undefined || !testData || !testData.address || !testData.message || (!testData.message.sender && testData.message.message.isMutating)) {
      return;
    }

    setShowPre(true);
  }, [choosedContractIndex, testData]);

  const onChange = useCallback((extrinsics: ContractBenchmark) => {
    setTestData(extrinsics);
  }, []);

  return (
    <div className={className}>
      <div className="start-area">
        <Button
          icon='play'
          isDisabled={false}
          label={'Start Benchmark'}
          onClick={onStart}
        />
        <span>
          <span className="contract-name">
            {choosedContractIndex !== undefined ? codes[choosedContractIndex].name : 'None'}&nbsp;
          </span>
          is choosed&nbsp;
          <span className="message-name">{

          }</span>
          &nbsp;is selected
          </span>
      </div>
      <div className="contract-list">
        {
          codes.map((code, index) =>
            <Contract
              key={index}
              code={code}
              expanded={choosedContractIndex === index}
              onChoosed={() => setChoosedContractIndex(index)}
              onChange={e => choosedContractIndex === index && onChange(e)}
            />
          )
        }
      </div>
      {
        showPre && choosedContractIndex !== undefined && testData &&
          <PreModal code={codes[choosedContractIndex]} testData={testData} onClose={() => setShowPre(false)}  />
      }
    </div>
  );
}

export default styled(Contracts)`

  .start-area {
    height: 70px;
    border: 1px solid ${Style.color.border.default};
    padding: 1rem;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    .contract-name, .message-name {
      font-weight: 600;
      color: ${Style.color.label.primary};
    }
  }
  .contract-list {
    background-color: white;
    border: 1px solid ${Style.color.border.default};
    padding: 15px;
    border-radius: 8px;
    overflow-y: auto;
    height: 100%;
  }
`;
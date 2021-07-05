import { Available, Dropdown, InputAddress, InputBalance } from '@polkadot/react-components'
import React, { FC, useCallback, useContext, useMemo, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import type { Abi } from '@polkadot/api-contract';
import { useAccountId, useApi, useNonZeroBn } from '@polkadot/react-hooks';
import Button from '@polkadot/react-components/Button/Button';
import { CodePromise } from '@polkadot/api-contract';
import BN from 'bn.js';
import { randomAsHex } from '@polkadot/util-crypto';
import useWeight from '../../../core/hooks/useWeight';
import { AccountsContext } from '../../../core';
import { keyring } from '@polkadot/ui-keyring';
import { handleTxResultsNoQueen } from '@polkadot/react-signer/util';
import Params from '../../../shared/Params';
import InputMegaGas from '../../../shared/InputMegaGas';
import MessageSignature from '../../../shared/MessageSignature';

export const ENDOWMENT = 1000;

const UploadModal: FC<{ abi: Abi, addContractAddress: (address: string) => void }> = ({ abi, addContractAddress }) => {
  const { api } = useApi();
  const { accounts } = useContext(AccountsContext);
  const [open, setOpen] = React.useState(false);
  const [accountId, setAccountId] = useAccountId();
  const [constructorIndex, setConstructorIndex] = useState(0);
  const [constructorParams, setConstructorParams] = useState<any[]>([]);
  const [endowment, isEndowmentValid, setEndowment] = useNonZeroBn(ENDOWMENT);
  const weight = useWeight();

  const constructOptions = useMemo(
    () => abi.constructors.map((c, index) => ({
        info: '',
        key: c.identifier,
        text: (
          <MessageSignature
            asConstructor
            message={c}
          />
        ),
        value: index
      })),
    [abi]
  );

  const deploy = useCallback(async () => {
    if (!endowment || !isEndowmentValid) {
      return;
    }

    const codePromise = new CodePromise(api, abi, undefined);
    const method = abi.constructors[constructorIndex].method;
    const salt = randomAsHex();
    console.log('constructorParams', {
      gasLimit: weight.weight,
      value: endowment,
      salt,
    }, ...constructorParams);
    const tx = codePromise.tx[method]({
      gasLimit: weight.weight,
      value: endowment,
      salt,
    }, ...constructorParams);

    const account = accounts.find(account => accountId &&
      keyring.encodeAddress(keyring.decodeAddress(account.address), 0) ===
        keyring.encodeAddress(keyring.decodeAddress(accountId), 0)
    )
    console.log('deploy account', account)

    if (!account) {
      return;
    }

    const pair = keyring.createFromUri(account.mnemonic);

    tx.signAndSend(pair, {}, handleTxResultsNoQueen('signAndSend', {
      async txSuccessCb(status) {
        const data = status.events.find(
          event => event.event.section.toLowerCase() === 'contracts' &&
            event.event.method.toLowerCase() === 'instantiated'
        )?.event.data.toHuman() as (string[] | undefined);
        const contractAddress = data && data[1];

        contractAddress && addContractAddress(contractAddress);
        setOpen(false);
      },
      async txFailedCb(status) {
        // Status        
      }
    }, () => {}));
  }, [endowment, isEndowmentValid, api, abi, constructorIndex, weight, constructorParams, accounts, accountId]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon='plus' label='Deploy contract' />}
    >
      <Modal.Header>Add contract address</Modal.Header>
      <Modal.Content>
        
      <div className="constructor">
          <InputAddress
            help={'Specify the user account to use for this deployment. Any fees will be deducted from this account.'}
            isInput={false}
            label={'deployment account'}
            labelExtra={
              <Available
                label={'transferrable'}
                params={accountId}
              />
            }
            onChange={setAccountId}
            type='account'
            value={accountId}
          />
          <Dropdown
            help={'The deployment constructor information for this contract, as provided by the ABI.'}
            isDisabled={abi.constructors.length <= 1}
            label={'deployment constructor'}
            onChange={setConstructorIndex}
            options={constructOptions}
            value={constructorIndex}
          />
          <Params
            onChange={setConstructorParams}
            params={abi.constructors[constructorIndex]?.args}
            registry={abi.registry}
          />
          <InputBalance
            help='The allotted endowment for the deployed contract, i.e. the amount transferred to the contract upon instantiation.'
            isError={!isEndowmentValid}
            label='endowment'
            onChange={setEndowment}
            value={endowment}
          />
          <InputMegaGas
            help='The maximum amount of gas that can be used by this deployment, if the code requires more, the deployment will fail.'
            weight={weight}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={deploy} positive>
          Deploy
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UploadModal
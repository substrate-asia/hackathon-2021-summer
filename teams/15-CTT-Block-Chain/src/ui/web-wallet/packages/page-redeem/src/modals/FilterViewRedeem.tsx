// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ActionStatus } from '@polkadot/react-components/Status/types';
import { ModalProps } from '../types';

import React, { useCallback, useState } from 'react';
import { Button, Select, Modal } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
//import keyring from '@polkadot/ui-keyring';

import { useTranslation } from '../translate';
//import useProxies from '../Accounts/useProxies';

interface Props extends ModalProps {
  appIdList?: Array<string>;
  cycleList?: Array<string>;
  className?: string;
  onClose: () => void;
  onStatusChange: (status: ActionStatus) => void;

  changeQueryStatus: (status: boolean) => void;
  changeAppId: (appId: string) => void;
  changeCycle: (cycle: string) => void;
}


function ProxyAdd ({ appIdList = [''],cycleList = [''], className = '', onClose, onStatusChange, changeQueryStatus, changeAppId, changeCycle}: Props): React.ReactElement<Props> {
  const { api, isDevelopment } = useApi();
  const { t } = useTranslation();

 const [{ isAppIdValid, appId }, setAppId] = useState({ isAppIdValid: false, appId: ''});
 const [{ isCycleValid, cycle }, setCycle] = useState({ isCycleValid: false, cycle: '' });

 //const [stashAddress, setStashAddress] = useState<string | null>(null);
 // const { hasOwned } = useProxies(stashAddress);
  //changeBlockNumber(valueList[0]);

  const _createProxied = useCallback(
    (): void => {
      onClose();
    },
    [api.genesisHash, isDevelopment, name, onClose, onStatusChange, changeQueryStatus, changeAppId, changeCycle, t]
  );

  const _onChangeAppId = useCallback(
    (appId: string): void=> {
      changeQueryStatus(true);
      changeAppId(appId);
      setAppId({ isAppIdValid: true, appId: appId })
    },
    []
  );
  const _onChangeCycle = useCallback(
    (cycle: string) : void=> {
      changeQueryStatus(true);
      changeCycle(cycle);
      setCycle({ isCycleValid: true, cycle: cycle })
    },
    []
  );
  console.log("appId:"+appId);
  console.log("cycle:"+cycle);
  return (
    <Modal
      className={className}
      header={t<string>('Redemption query')}
      size='large'
    >
      <Modal.Content>
        <Modal.Columns>
          <Modal.Column>
            <Select
              valueList={appIdList}
              className='full'
              help={t<string>('Enter the Application ID of the token you want to search.')}
              label={t<string>('AppId')}
              isError={isAppIdValid}
              onChange={_onChangeAppId}
            >

            </Select>
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('')}</p>
          </Modal.Column>
        </Modal.Columns>

        <Modal.Columns>
          <Modal.Column>
            <Select
              valueList={cycleList}
              className='full'
              help={t<string>('Enter the Cycle of the token you want to search.')}
              label={t<string>('Cycle')}
              isError={isCycleValid}
              onChange={_onChangeCycle}
            >

            </Select>
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('')}</p>
          </Modal.Column>
        </Modal.Columns>

      </Modal.Content>
      <Modal.Actions onCancel={onClose}>
        <Button
          icon='check'
          isDisabled={false}
          label={t<string>('Submit')}
          onClick={_createProxied}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default React.memo(ProxyAdd);

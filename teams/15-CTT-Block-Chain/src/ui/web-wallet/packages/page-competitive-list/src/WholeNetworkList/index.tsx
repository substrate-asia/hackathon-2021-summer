// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveLeaderboardKeyGroup, DeriveLeaderboardKeys, DeriveApp, DeriveLeaderboardCycle} from '@polkadot/api-derive/types';

import { ActionStatus } from '@polkadot/react-components/Status/types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useApi, useCall, useLoadingDelay, useToggle } from '@polkadot/react-hooks';
import { Button, Input, Table } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Proxy from '../modals/ProxiedAdd';
import Account from './Account';

interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
}


function Overview ({ className = '', onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isProxyOpen, toggleProxy] = useToggle();
  const [filterOn, setFilter] = useState<string>('');

  //新增的
  const [queryLbParam, setQueryLbParam] = useState<DeriveLeaderboardCycle[] | undefined>();
  const [queryStatus, setQueryStatus] = useState<boolean>(false);
  const [appId, setAppId] = useState<string>('');
  const [blockNumber, setBlockNumber] = useState<string>('');
  const [modelID, setModelID] = useState<string>('');

  const isLoading = useLoadingDelay();

  const lbKeys = useCall<DeriveLeaderboardKeyGroup>(api.derive.kp.leaderboardKeys);

  var appIdList: Array<string>=[];
  var valueList: Array<string>=[];

  var cycle: string = '';
  //默认显示榜单最新一期：
   let queryLbParamItem: DeriveLeaderboardKeys = [];
   if( !!queryLbParam ){
     queryLbParam.forEach((val, idx, array) => {
        if(blockNumber!=''){
          if(val.index == blockNumber+''){
            cycle = val.index;
            queryLbParamItem = val.keys;
          }
          valueList.push(val.index);
        }else{
          queryLbParamItem = val.keys;
          valueList.push(val.index);
          cycle = val.index;
        }
     });
   }
  console.log("queryLbParamItem:" + JSON.stringify(queryLbParamItem));

  const apps = useCall<DeriveApp>(api.derive.members.apps);
  //console.log("apps:" + JSON.stringify(apps));
  if (!!apps) {
    apps.infos.forEach(app => {
      appIdList.push(app.appId+'');
    });
  }

  if(appId==''&& appIdList.length>0){
    setAppId(appIdList[0]);
  }
  if(blockNumber==''&& valueList.length>0){
    setBlockNumber(valueList[valueList.length-1]);
  }

  const headerRef = useRef([
    [t('Experience goods id'), 'start', 2],
    [t('AppId'), 'start'],
    [t('Goods type id'), 'start'],
    [t('accounts'), 'start'],
    [t('List period'), 'start'],
    [t('Ranking'), 'start'],
    [t('state'), 'start'],
    [t('Knowledge power (kp)'), 'expand'],
    [],
    [],
  ]);

  useEffect((): void => {

  }, []);

  useEffect(() => {

    setFilter(appId + ', ' + blockNumber + ', ' + modelID);
    if( !!lbKeys){
      setQueryLbParam(lbKeys.global);
    }

  }, [api, appId, blockNumber, modelID, lbKeys]);


  const footer = useMemo(() => (
    <tr>
      <td colSpan={3} />
      <td className='media--1400' />
      <td colSpan={2} />
      <td className='media--1500' />
      <td />
      <td />
      <td className='number'>

      </td>
      <td className='number'>

      </td>
      <td />
    </tr>
  ), []);

  const filter = useMemo(() => (
    <div className='filter--tags'>
      <Input
        autoFocus
        isFull
        label={t<string>('filter by name appId , blockNumber , or modelId')}
        onChange={setFilter}
        value={filterOn}
      />
    </div>
  ), [filterOn, t]);

  var intoType = 'WholeNetworklist';
  /* {!isLoading && !queryStatus && queryLbParam&&
   <Account
      param2={queryLbParamItem.keys}
      intoType={'default'}
      appId={appId}
      blockNumber={blockNumber}
      modelID={modelID}
    />
  } */
  console.log("queryStatus:" + queryStatus);
  return (
    <div className={className}>
      {isProxyOpen && (
        <Proxy
          appIdList={appIdList}
          intoType={intoType}
          valueList={valueList}
          onClose={toggleProxy}
          onStatusChange={onStatusChange}
          changeQueryStatus={setQueryStatus}
          changeAppId={setAppId}
          changeBlockNumber={setBlockNumber}
          changeModelID={setModelID}
        />
      )}
      <Button
        icon='plus'
        isDisabled={false}
        label={t<string>('List query')}
        onClick={toggleProxy}
      />
    <div className={className} >
    </div>
      <Table
        empty={( (!isLoading && queryLbParamItem)) && t<string>("You don't have any accounts. Some features are currently hidden and will only become available once you have accounts.")}
        filter={filter}
        footer={footer}
        header={headerRef.current}
      >
        {queryLbParamItem &&queryLbParamItem.map((pa, index): React.ReactNode => (
         <Account
            key={index}
            cycle={cycle}
            param2={pa}
            intoType={'query'}
            appId={appId}
            blockNumber={blockNumber}
            modelID={modelID}
          />
          ))
        }
      </Table>
    </div>
  );
}

export default React.memo(styled(Overview)`
  .filter--tags {

    .ui--Dropdown {
      padding-left: 0;

      label {
        left: 1.55rem;
      }
    }
  }
`);

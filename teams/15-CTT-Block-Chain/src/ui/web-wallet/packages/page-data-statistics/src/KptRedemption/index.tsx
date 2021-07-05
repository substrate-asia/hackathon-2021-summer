
// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveModelData} from '@polkadot/api-derive/types';

import { ActionStatus } from '@polkadot/react-components/Status/types';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useApi, useCall, useLoadingDelay } from '@polkadot/react-hooks';
import { Input, Table } from '@polkadot/react-components';
//import { BN_ZERO } from '@polkadot/util';

import { useTranslation } from '../translate';
import Account from './Account';
//import { sortAccounts } from '../util';
import Summary from './Summary';


interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
}

//const STORE_FAVS = 'accounts:favorites';

function Overview ({ className = '', onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [filterOn, setFilter] = useState<string>('');



  const isLoading = useLoadingDelay();

  const headerRef = useRef([
    [t('Model id'), 'start', 2],
    [t('accounts'), 'start'],
    [t('AppId'), 'start'],
    [t('state'), 'start'],
    [t('Member of model group'), 'address'],
    [t('earnest money'), 'address'],
    [t('Total profit of models'), 'expand'],
    [t(''), 'expand'],
    [],
    [],
  ]);

  useEffect((): void => {

  }, []);

  useEffect(() => {

  }, [api]);


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
      <td />
    </tr>
  ), []);

  const filter = useMemo(() => (
    <div className='filter--tags'>
      <Input
        autoFocus
        isFull
        label={t<string>('filter by number of additional issues')}
        onChange={setFilter}
        value={filterOn}
      />
    </div>
  ), [filterOn, t]);

  const allModels = useCall<DeriveModelData[]>(api.derive.kp.allModels);
  console.log("allModels:"+JSON.stringify(allModels));

  return (
    <div className={className}>

       <div className={className} >
        <Summary
          modelNum={allModels?.length}
        />
       </div>

      <Table
        empty={(!isLoading && allModels) && t<string>("")}
        filter={filter}
        footer={footer}
        header={headerRef.current}
      >
        {!isLoading && allModels?.map((models, index): React.ReactNode => (
          <Account
            account={models.account}
            appId={models.appId}
            modelId={models.modelId}
            commodityName={models.commodityName}
            experts={models.experts}
            deposit={models.deposit}
            status={models.status}
            createReward={models.createReward?models.createReward:''}
            key={index}
          />
        ))}
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

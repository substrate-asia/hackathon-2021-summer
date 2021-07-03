// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveModelDispute, DeriveModelDisputeData, DeriveModelDisputeSummary} from '@polkadot/api-derive/types';

import { ActionStatus } from '@polkadot/react-components/Status/types';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useApi, useCall, useLoadingDelay } from '@polkadot/react-hooks';
import { Input, Table } from '@polkadot/react-components';
//import { BN_ZERO } from '@polkadot/util';
import { useTranslation } from '../translate';

import Account from './Account';
import Summary from './Summary';


interface Props {
  className?: string;
  onStatusChange: (status: ActionStatus) => void;
}


function Overview ({ className = '', onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [filterOn, setFilter] = useState<string>('');

  const isLoading = useLoadingDelay();

  var newData: DeriveModelDisputeData[] = [];
  var disputeSummary: DeriveModelDisputeSummary = {
    total: 0,
    lv0Count: 0,
    lv1Count: 0,
    lv2Count: 0,
  };

  const headerRef = useRef([
    [t('Model id'), 'start', 2],
    [t('Accounts'), 'start'],
    [t('AppId'), 'start'],
    [t('General error'), 'start'],
    [t('More serious error'), 'start'],
    [t('Serious error'), 'start'],
    [t(''), 'start'],
    [t(''), 'start'],
    [],
    [],
  ]);

  useEffect((): void => {

  }, []);

  useEffect(() => {

  }, []);



  const footer = useMemo(() => (
    <tr>
      <td className='address'  />
      <td className='address' />
      <td className='address' />
      <td className='address' />
      <td className='address' />
      <td className='number' />
      <td className='address' />
      <td />
      <td />
      <td />
    </tr>
  ), []);

  const filter = useMemo(() => (
    <div className='filter--tags'>
      <Input
        autoFocus
        isFull
        label={t<string>('filter by name or tags')}
        onChange={setFilter}
        value={filterOn}
      />
    </div>
  ), [filterOn, t]);

   const disputeData = useCall<DeriveModelDispute>(api.derive.kp.modelDisputeStatistic)
   console.log("disputeData:", JSON.stringify(disputeData));

   if (!!disputeData) {
     newData = disputeData.data;
     disputeSummary = disputeData.summary;
     disputeData.data.forEach(dispute => {
       console.log("dispute:"+JSON.stringify(dispute));
     });
   }

  return (
    <div className={className}>
      <div className={className} >
       <Summary
         disputeSummary={disputeSummary}
       />
      </div>
      <Table
        empty={(!isLoading && newData) && t<string>("")}
        filter={filter}
        footer={footer}
        header={headerRef.current}
      >
        {!isLoading && newData?.map(( disputeData , index): React.ReactNode => (
          <Account
            disputeData={disputeData}
            disputeSummary={disputeSummary}
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

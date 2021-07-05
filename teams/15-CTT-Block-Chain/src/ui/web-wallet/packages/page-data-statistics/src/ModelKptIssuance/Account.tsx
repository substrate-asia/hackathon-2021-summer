// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

//import { DeriveAccountPowers} from '@polkadot/api-derive/types';
import styled from 'styled-components';

import BN from 'bn.js';
import React, {  useEffect} from 'react';
//import styledfrom 'styled-components';
import { AddressSmall} from '@polkadot/react-components';
import {  useApi, useCall } from '@polkadot/react-hooks';


interface Props {
  year: string;
  account: string;
  appId?: string;
  modelId?: string;
  status?: string;
  className?: string;
  filter?: string;
  rewards: string;
  //rewards: string[];
}



function Account ({ year = '', account = '', className = '', appId = '', modelId = '', status = '', rewards = '', filter }: Props): React.ReactElement<Props> | null {
  //const { t } = useTranslation();
  //const { theme } = useContext<ThemeDef>(ThemeContext);
  //const { queueExtrinsic } = useContext(StatusContext);
  const api = useApi();
  const bestNumber = useCall<BN>(api.api.derive.chain.bestNumber);

  useEffect((): void => {

  }, [account, api]);

  useEffect((): void => {

  }, [account, api, bestNumber]);

 //测试数据
 //var rewards2=['10000000000'];

 /* 
  {rewards&&
  (
  <AddressInfoKPT
    isformat={false}
    kptInfo={rewards}
    address={account}
    withBalance
    withBalanceToggle
    withExtended={false}
  />
  )
  }
  */
  return (
    <tr className={className}>
      <td className='favorite'>

      </td>
      <td className='address'>
        {modelId+''}
      </td>
      <td className='address'>
        <AddressSmall value={account+''} />
      </td>

      <td className='address'>
        {appId+''}
      </td>

      <td className='address'>
        {year}
      </td>
      <td className='number'>
        {rewards}
      </td>
      <td className='number'>

      </td>
      <td />
      <td />
      <td />
    </tr>
  );
}

export default React.memo(styled(Account)`
  .tags {
    width: 100%;
    min-height: 1.5rem;
  }
`);

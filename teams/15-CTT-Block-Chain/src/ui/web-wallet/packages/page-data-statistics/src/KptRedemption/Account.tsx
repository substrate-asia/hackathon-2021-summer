// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
//import { DeriveAccountPowers} from '@polkadot/api-derive/types';
import styled from 'styled-components';

import BN from 'bn.js';
import React, {  useEffect} from 'react';
//import styledfrom 'styled-components';
import { AddressSmall, AddressInfoAddress} from '@polkadot/react-components';
import {  useApi, useCall } from '@polkadot/react-hooks';
import { useTranslation } from '../translate';

//import {formatBalance } from '@polkadot/util';
interface Props {
  account: string;
  appId?: string;
  modelId?: string;
  commodityName?: string;
  experts?: Array<string>;
  deposit?: string;
  status?: string;
  className?: string;
  filter?: string;
  createReward: string;
}
function Account ({ account = '', className = '', appId = '', modelId = '', commodityName = '', experts = [''], deposit = '', status = '', createReward = '', filter }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  //const { theme } = useContext<ThemeDef>(ThemeContext);
 // const { queueExtrinsic } = useContext(StatusContext); */
  const api = useApi();
  const bestNumber = useCall<BN>(api.api.derive.chain.bestNumber);

  useEffect((): void => {

  }, [account, api]);

  useEffect((): void => {

  }, [account, api, bestNumber]);

 /* console.log("commodityName:" + commodityName);
  console.log("experts:" + JSON.stringify(experts));
  console.log("deposit:" + deposit);
  console.log("createReward:" + createReward); */

 /*  */
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
        {t<string>(status)}
      </td>
      <td className='address'>
        {commodityName&&
        (
        <AddressInfoAddress
          isformat={false}
          displayName={commodityName}
          addressInfo={experts}
          address={account}
          withBalance
          withBalanceToggle
          withExtended={false}
        />
        )
        }
      </td>
      <td className='number'>
        {deposit+' KPT'}
      </td>
      <td className='number'>
         {createReward+' KPT'}
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

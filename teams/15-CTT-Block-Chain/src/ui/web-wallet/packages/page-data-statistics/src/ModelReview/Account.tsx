// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { DeriveModelDisputeData, DeriveModelDisputeSummary } from '@polkadot/api-derive/types';
import styled from 'styled-components';

//import BN from 'bn.js';
import React, {  useEffect } from 'react';
//import styled from 'styled-components';
//import { FormatBalance } from '@polkadot/react-query';
import { AddressSmall} from '@polkadot/react-components';
//import { useApi} from '@polkadot/react-hooks';
//import { useTranslation } from '../translate';

interface Props {
  disputeData?: DeriveModelDisputeData;
  disputeSummary?: DeriveModelDisputeSummary;
  className?: string;
}

function Account ({ disputeData , disputeSummary, className = ''}: Props): React.ReactElement<Props> | null {
  //const { t } = useTranslation();
  //const { theme } = useContext<ThemeDef>(ThemeContext);
  //const { queueExtrinsic } = useContext(StatusContext);
 // const api = useApi();

  useEffect((): void => {

  }, []);

  useEffect((): void => {

  }, []);

  return (
     <tr className={className}>
       <td className='favorite'>

       </td>
       <td className='address'>
         {disputeData?disputeData.modelId+'':''}
       </td>

       <td className='address'>
         <AddressSmall value={disputeData?disputeData.account+'':''} />
       </td>
       <td className='address'>
         {disputeData?disputeData.appId:''}
       </td>
       <td className='address'>
         {disputeData?disputeData.lv0Count+'':'0'}{'/'}{disputeSummary?disputeSummary.total+'':'0'}
       </td>
       <td className='address'>
           {disputeData?disputeData.lv1Count+'':'0'}{'/'}{disputeSummary?disputeSummary.total+'':'0'}
       </td>
       <td className='address'>
          {disputeData?disputeData.lv2Count+'':'0'}{'/'}{disputeSummary?disputeSummary.total+'':'0'}
       </td>
       <td className='address'>

       </td>
       <td className='number'>

       </td>
        <td  className='expand'/>
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

// Copyright 2017-2020 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { FormatKP } from '@polkadot/react-query';
//import { AccountId } from '@polkadot/types/interfaces';
import { DeriveLeaderboardData, DeriveLeaderBoardItem } from '@polkadot/api-derive/types';


import React, { useEffect} from 'react';
import styled from 'styled-components';
import { AddressSmall} from '@polkadot/react-components';
import {  useApi, useCall } from '@polkadot/react-hooks';


interface Props {
  cycle?: string;
  param2: Array<string>;
  className?: string;
  intoType?: string;
  appId?: string;
  blockNumber?: string;
  modelID?: string;
}





function Account ({ cycle = '', param2 = [], className = '', appId='', intoType='', blockNumber='', modelID='',}: Props): React.ReactElement<Props> | null | any {
 // const { t } = useTranslation();
 // const { theme } = useContext<ThemeDef>(ThemeContext);
 // const { queueExtrinsic } = useContext(StatusContext);
  const api = useApi();

  useEffect((): void => {

  }, []);

  useEffect((): void => {

  }, []);

  //let appIdStr: string = '';
  //let cycle: string = '';//榜单期数

  let queryFlag = true;
  var newParam2 : Array<number|string>=[];
  newParam2.push(param2[0]);
  newParam2.push(param2[1]);
  newParam2.push(param2[2]);

  if(!!newParam2 && newParam2.length > 0 ){

    if( !!newParam2[2] ){

      console.log("newParam2[0]:"+newParam2[0]);//[1000,123190,""]   appId, blockNumber, modelId

      //appIdStr = newParam2[0].toString();

      //cycle = newParam2[1].toString();

    }else{//清空数据，modelId为空的不查,只查模型榜单
      queryFlag = false;
      newParam2[0]='';
      newParam2[1]='';
      newParam2[2]='';
    }

  }
  if(queryFlag){//modelId不为空的榜单
    const lb = useCall<DeriveLeaderboardData>(api.api.derive.kp.leaderboardRecord, [newParam2]);
    console.log("lb:"+JSON.stringify(lb));

    let flag = true;
    if( appId!='' ){
      if(param2[0] != appId){
        flag = false;
      }
    }
    if( modelID!='' ){
      if(param2[2] != modelID){
        flag = false;
      }
    }

    if(flag){
      var board: Array<DeriveLeaderBoardItem>=[];
      // var accounts: Array=[];
      if( !!lb ){
        /* if( !!lb.accounts && lb.accounts.length > 0){
          accounts = lb.accounts;
        } */
        if(!!lb.board && lb.board.length > 0){
          board = lb.board;
        }
      }
      console.log("board:"+JSON.stringify(board));
     // console.log("accounts:"+JSON.stringify(accounts));



      const status = '正常';
      return (
        <>
          {board?.map(({ commodityId, owner, power }, index): React.ReactNode => (

              <tr className={className}>
                <td className='favorite'>

                </td>
                <td className='address'>
                  { commodityId }
                </td>
                <td className='address'>
                  {  appId+'' }
                </td>
                <td className='address'>

                </td>
                <td className='address'>
                  <AddressSmall value={owner} />
                </td>
                <td className='address'>
                  { cycle }
                </td>
                <td className='address'>
                 {(index+1)+''}
                </td>
                <td className='address'>
                 {status}
                </td>
                <td className='number'>
                 <FormatKP
                   value={(parseFloat(power+'') / 100.00 ).toFixed(2).toString()}
                   withSi
                 />
                </td>
                <td />
                <td />
                <td />
              </tr>
           ))
          }
        </>
      );
    }else{
      return (
        <></>
      );
    }
  }else{
    return (
      <></>
    );
  }


}

export default React.memo(styled(Account)`
  .tags {
    width: 100%;
    min-height: 1.5rem;
  }
`);

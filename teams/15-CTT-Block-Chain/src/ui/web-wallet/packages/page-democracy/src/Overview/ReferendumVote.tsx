// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveReferendumVote } from '@polkadot/api-derive/types';
import { Vote } from '@polkadot/types/interfaces';

import React , {  }from 'react';
import { AddressMini } from '@polkadot/react-components';
import { useCall, useApi } from '@polkadot/react-hooks';
import BN from 'bn.js';

interface Props{
  vote: DeriveReferendumVote;
  ReferendumVoteIndex: string;
  totalItemList2:Array<string>;
  changeTest: (test: string) => void;
  changeTotalItemList: (totalItemList: Array<string>) => void;
}

const sizing = ['0.1x', '1x', '2x', '3x', '4x', '5x', '6x'];

function voteLabel ({ conviction }: Vote, isDelegating: boolean): string {
  return `${sizing[conviction.toNumber()]}${isDelegating ? '/d' : ''} - `;
}

function ReferendumVote ({ vote: { accountId, balance, isDelegating, vote }, ReferendumVoteIndex = '0', totalItemList2 = [''], changeTotalItemList, changeTest }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  var intoType = 'ReferendumVote';

  /* console.log("totalItemList_into:"+JSON.stringify(totalItemList2));
  console.log("ReferendumVoteIndex:"+ReferendumVoteIndex);
  console.log("accountId:"+accountId); */
  if(ReferendumVoteIndex == '0'){
    totalItemList2.forEach((val, idx, array) => {
      array[idx] = '';
    });
  }
  
  const FLOAT_BASE = 10000;
  let newBalance = new BN(0);
  var powerRatio = useCall<string>(api.derive.kp.powerRatio, [accountId+'']);
  //console.log("powerRatio:"+powerRatio);
  if (balance && powerRatio) {
    newBalance = balance.muln(Math.floor(Number(powerRatio) * FLOAT_BASE)).divn(FLOAT_BASE);
    totalItemList2.push(newBalance+'');
    //console.log("totalItemList2:"+JSON.stringify(totalItemList2));
    changeTotalItemList(totalItemList2);
    changeTest("into");
  }
  return (
    <AddressMini
      intoType={intoType}
      balance={balance}
      labelBalance={voteLabel(vote, isDelegating)}
      value={accountId}
      withBalance
    />
  );
}

export default React.memo(ReferendumVote);

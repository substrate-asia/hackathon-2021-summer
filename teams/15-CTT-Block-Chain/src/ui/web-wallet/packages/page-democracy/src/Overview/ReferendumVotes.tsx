// Copyright 2017-2020 @polkadot/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveReferendumVote } from '@polkadot/api-derive/types';

import BN from 'bn.js';
import React, { useEffect, useMemo , useState} from 'react';
import { Expander } from '@polkadot/react-components';
import { FormatBalance } from '@polkadot/react-query';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';
import ReferendumVote from './ReferendumVote';

interface Props {
  change: BN;
  className?: string;
  count: number;
  isAye: boolean;
  isWinning: boolean;
  total: BN;
  votes: DeriveReferendumVote[];
}

const LOCKS = [1, 10, 20, 30, 40, 50, 60];

function ReferendumVotes ({ change, className, count, isAye, isWinning, total, votes }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();

  var [totalItemList, setTotalItemList] = useState<Array<string> | undefined>();
  const [test, setTest] = useState<string>('');
  if( totalItemList == undefined){
    var a: Array<string> = [''];
    setTotalItemList(a);
  }
  var newTotal = new BN(0);
  if(Number(newTotal+'')==0){
    newTotal = total;
  }

  useEffect(() => {

  //  console.log("totalItemList:"+JSON.stringify(totalItemList));
    var newTotal2 = BigInt(0);
    if(!!totalItemList){
      totalItemList.forEach((val, idx, array) => {
        newTotal2 = BigInt(val+'') + newTotal2;
      });
    }
    newTotal = new BN(newTotal2+'');
   // console.log("newTotal:"+newTotal);

  }, [totalItemList, setTotalItemList, test, setTest]);

  const sorted = useMemo(
    () => votes.sort((a, b) => {
      const ta = a.balance.muln(LOCKS[a.vote.conviction.toNumber()]).divn(10);
      const tb = b.balance.muln(LOCKS[b.vote.conviction.toNumber()]).divn(10);

      return tb.cmp(ta);
    }),
    [votes]
  );
 /* console.log("totalItemList3:"+JSON.stringify(totalItemList));
  console.log("sorted:"+JSON.stringify(sorted));
  console.log("total:"+total); */


  return (
    <Expander
      className={className}
      help={change.gtn(0) && (
        <>
          <FormatBalance value={change} />
          <p>{isWinning
            ? t<string>('The amount this total can be reduced by to change the referendum outcome. This assumes changes to the convictions of the existing votes, with no additional turnout.')
            : t<string>('The amount this total should be increased by to change the referendum outcome. This assumes additional turnout with new votes at 1x conviction.')
          }</p>
        </>
      )}
      helpIcon={isWinning ? 'arrow-circle-down' : 'arrow-circle-up'}
      summary={
        <>
          {isAye
            ? t<string>('Aye {{count}}', { replace: { count: count ? ` (${formatNumber(count)})` : '' } })
            : t<string>('Nay {{count}}', { replace: { count: count ? ` (${formatNumber(count)})` : '' } })
          }
          <div><FormatBalance value={newTotal} /></div>
        </>
      }
    >
      {sorted.map((vote, index) =>
        <ReferendumVote
          key={vote.accountId.toString()}
          vote={vote}
          ReferendumVoteIndex={index+''}
          totalItemList2={totalItemList?totalItemList:['']}
          changeTest={setTest}
          changeTotalItemList={setTotalItemList}
        />
      )}
    </Expander>
  );
}

export default React.memo(ReferendumVotes);

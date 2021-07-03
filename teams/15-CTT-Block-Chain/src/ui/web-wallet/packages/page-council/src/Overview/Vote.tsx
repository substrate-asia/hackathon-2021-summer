// Copyright 2017-2020 @polkadot/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveElectionsInfo } from '@polkadot/api-derive/types';
import { PowerSize } from '@polkadot/types/interfaces';
import BN from 'bn.js';

import React, { useEffect, useState } from 'react';
import { Button, InputAddress, InputAddressMulti, Modal, TxButton, VoteValue , InputBalanceChanges} from '@polkadot/react-components';
import { useApi, useToggle , useCall} from '@polkadot/react-hooks';
import { BN_ZERO } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  electionsInfo?: DeriveElectionsInfo;
}

const MAX_VOTES = 16;

function Vote ({ electionsInfo }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [isVisible, toggleVisible] = useToggle();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [available, setAvailable] = useState<string[]>([]);
  const [defaultVotes, setDefaultVotes] = useState<string[]>([]);
  const [votes, setVotes] = useState<string[]>([]);
  const [voteValue, setVoteValue] = useState(BN_ZERO);



  useEffect((): void => {
    if (electionsInfo) {
      const { candidates, members, runnersUp } = electionsInfo;

      setAvailable(
        members
          .map(([accountId]): string => accountId.toString())
          .concat(runnersUp.map(([accountId]) => accountId.toString()))
          .concat(candidates.map((accountId) => accountId.toString()))
      );
    }
  }, [electionsInfo]);

  //console.log("powerRatio:"+powerRatio);
  //console.log("voteValue:"+voteValue);
  const FLOAT_BASE = 10000;
  const newAccount = accountId ? accountId : '' ;
  const powerRatio = useCall<string>(api.derive.kp.powerRatio, [newAccount]);
  let powerWeighted = new BN(0);
  
  if (voteValue && powerRatio) {
    powerWeighted = voteValue.muln(Math.floor(Number(powerRatio) * FLOAT_BASE)).divn(FLOAT_BASE);
  }
  
  /* if(!!powerRatio && !!voteValue){
    var a = BigInt(0);
    if(Number(powerRatio)!=1){
      a= BigInt(voteValue+'') * BigInt((Number(parseFloat(powerRatio+'').toFixed(4)+'') * 10000 ) + '') ;
      a = a / BigInt(10000+'');
    }else{
      a = BigInt(voteValue+'') * BigInt(Number(powerRatio) + '') ;
    }
    powerWeighted = new BN(a+'');
  } */
  //console.log("powerWeighted:"+powerWeighted);

  useEffect((): void => {
    accountId && api.derive.council.votesOf(accountId).then(({ votes }): void => {
      setDefaultVotes(
        votes
          .map((accountId): string => accountId.toString())
          .filter((accountId): boolean => available.includes(accountId))
      );
    });


  }, [api, accountId, available]);

  let controllerAccountKp: number = 0;
  var newAccountId = accountId?accountId:'';
  var pow = useCall<PowerSize>(api.derive.kp.accountPower, [newAccountId]);
  if(!!accountId){
    if (!!pow) {
      controllerAccountKp = Number(pow+'') / 100.0;
    }
  }
  return (
    <>
      <Button
        icon='check'
        isDisabled={available.length === 0}
        label={t<string>('Vote')}
        onClick={toggleVisible}
      />
      {isVisible && (
        <Modal
          header={t<string>('Vote for current candidates')}
          size='large'
        >
          <Modal.Content>
            <Modal.Columns>
              <Modal.Column>
                <InputAddress
                  help={t<string>('This account will be use to approve each candidate.')}
                  label={t<string>('voting account')}
                  onChange={setAccountId}
                  type='account'
                />
              </Modal.Column>
              <Modal.Column>
                <p>{t<string>('The vote will be recorded for the selected account.')}</p>
              </Modal.Column>
            </Modal.Columns>
            <Modal.Columns>
              <Modal.Column>
                <VoteValue
                  accountId={accountId}
                  isCouncil
                  onChange={setVoteValue}
                />
              </Modal.Column>
              <Modal.Column>
                <p>{t<string>('The value associated with this vote. The amount will be locked (not available for transfer) and used in all subsequent elections.')}</p>
              </Modal.Column>
            </Modal.Columns>
            <Modal.Columns>
              <Modal.Column>
                <InputBalanceChanges
                  autoFocus
                  defaultValue={powerWeighted}
                  isDisabled={true}
                  help={t<string>("The calculation power weighted value refers to the final value of the mortgage's KPT after calculation power weighted, which is calculated by multiplying the number of KPT by the calculation power weighted multiple.")}
                  isError={false}
                  label={t<string>('KP weighted value')}
                  labelExtra={
                    <span className='label'>{t<string>('KPValue')}{controllerAccountKp?controllerAccountKp+' KP':''} </span>
                  }
                />
              </Modal.Column>
              <Modal.Column>
                <p>{t<string>('The balance associated with the vote will be locked as per the conviction specified and will not be available for transfer during this period.')}</p>
                <p>{t<string>('Conviction locks do overlap and is additive, meaning that funds locked during a previous vote can be locked again.')}</p>
              </Modal.Column>
            </Modal.Columns>
            <Modal.Columns>
              <Modal.Column>
                <InputAddressMulti
                  available={available}
                  availableLabel={t<string>('council candidates')}
                  defaultValue={defaultVotes}
                  help={t<string>('Select and order council candidates you wish to vote for.')}
                  maxCount={MAX_VOTES}
                  onChange={setVotes}
                  valueLabel={t<string>('my ordered votes')}
                />
              </Modal.Column>
              <Modal.Column>
                <p>{t<string>('The votes for the members, runner-ups and candidates. These should be ordered based on your priority.')}</p>
                <p>{t<string>('In calculating the election outcome, this prioritized vote ordering will be used to determine the final score for the candidates.')}</p>
              </Modal.Column>
            </Modal.Columns>
          </Modal.Content>
          <Modal.Actions onCancel={toggleVisible}>
            <TxButton
              accountId={accountId}
              icon='trash-alt'
              isDisabled={!defaultVotes.length}
              label={t<string>('Unvote all')}
              onStart={toggleVisible}
              params={[]}
              tx={
                api.tx.electionsPhragmen
                  ? 'electionsPhragmen.removeVoter'
                  : 'elections.removeVoter'
              }
            />
            <TxButton
              accountId={accountId}
              isDisabled={!accountId || votes.length === 0 || voteValue.lten(0)}
              label={t<string>('Vote')}
              onStart={toggleVisible}
              params={[votes, voteValue]}
              tx={
                api.tx.electionsPhragmen
                  ? 'electionsPhragmen.vote'
                  : 'elections.vote'
              }
            />
          </Modal.Actions>
        </Modal>
      )}
    </>
  );
}

export default React.memo(Vote);

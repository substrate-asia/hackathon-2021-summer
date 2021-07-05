// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DeriveBalancesAll } from '@polkadot/api-derive/types';
import { PowerSize } from '@polkadot/types/interfaces';
import { AmountValidateState, DestinationType } from '../types';
import { BondInfo } from './types';

import BN from 'bn.js';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown, InputAddress, InputBalance, InputBalanceChanges, Modal, Static } from '@polkadot/react-components';
import { BalanceFree, BlockToTime } from '@polkadot/react-query';
import { useApi, useCall } from '@polkadot/react-hooks';
import { BN_ZERO } from '@polkadot/util';

import { useTranslation } from '../../translate';
import InputValidateAmount from '../Account/InputValidateAmount';
import InputValidationController from '../Account/InputValidationController';
import { createDestCurr } from '../destOptions';
import useUnbondDuration from '../useUnbondDuration';

interface Props {
  className?: string;
  onChange: (info: BondInfo) => void;
}

function Bond ({ className = '', onChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const [amount, setAmount] = useState<BN | undefined>();
  const [amountError, setAmountError] = useState<AmountValidateState | null>(null);
  const [controllerError, setControllerError] = useState<boolean>(false);
  const [controllerId, setControllerId] = useState<string | null>(null);
  const [destination, setDestination] = useState<DestinationType>('Staked');
  const [destAccount, setDestAccount] = useState<string | null>(null);
  const [stashId, setStashId] = useState<string | null>(null);
  const [startBalance, setStartBalance] = useState<BN | null>(null);
  const stashBalance = useCall<DeriveBalancesAll>(api.derive.balances.all, [stashId]);
  const bondedBlocks = useUnbondDuration();

  let powerRatio = useCall<string>(api.derive.kp.powerRatio, [controllerId]);
  console.log("powerRatio:"+powerRatio);
  //console.log("startBalance:"+startBalance);
  
  const FLOAT_BASE = 10000;
  let powerWeighted : BN = new BN(0);
  if (startBalance && powerRatio) {
    powerWeighted = startBalance.muln(Math.floor(Number(powerRatio) * FLOAT_BASE)).divn(FLOAT_BASE);
  }
  //console.log("powerWeighted:"+powerWeighted);
  if (amount && powerRatio) {
    powerWeighted = amount.muln(Math.floor(Number(powerRatio) * FLOAT_BASE)).divn(FLOAT_BASE);
  }
  console.log("powerWeighted2:"+powerWeighted);

  const options = useMemo(
    () => createDestCurr(t),
    [t]
  );

  const _setError = useCallback(
    (_: string | null, isFatal: boolean) => setControllerError(isFatal),
    []
  );

  useEffect((): void => {
    stashBalance && setStartBalance(
      stashBalance.freeBalance.gt(api.consts.balances.existentialDeposit)
        ? stashBalance.freeBalance.sub(api.consts.balances.existentialDeposit)
        : BN_ZERO
    );
  }, [api, stashBalance]);

  useEffect((): void => {
    setStartBalance(null);
  }, [stashId]);

  useEffect((): void => {

  }, [amount]);

  useEffect((): void => {
    const bondDest = destination === 'Account'
      ? { Account: destAccount }
      : destination;

    onChange(
      (amount && amount.gtn(0) && !amountError?.error && !controllerError && controllerId && stashId)
        ? {
          bondOwnTx: api.tx.staking.bond(stashId, amount, bondDest),
          bondTx: api.tx.staking.bond(controllerId, amount, bondDest),
          controllerId,
          controllerTx: api.tx.staking.setController(controllerId),
          stashId
        }
        : {
          bondOwnTx: null,
          bondTx: null,
          controllerId: null,
          controllerTx: null,
          stashId: null
        }
    );
  }, [api, amount, amountError, controllerError, controllerId, destination, destAccount, stashId, onChange]);

  const hasValue = !!amount?.gtn(0);
  const isAccount = destination === 'Account';

 // const testError=false;
  //const isDisabledInput=true;

  //let amountVote = new BN(0);
  //default kp factor is 0.1;
  //let kpFactor = 0.1;



  let controllerAccountKp: number = 0;


  let accountPower = new BN(0);

  const pow = useCall<PowerSize>(api.derive.kp.accountPower, [controllerId]);
  if (!!pow) {
    accountPower = pow;
    controllerAccountKp = Number(accountPower.toString()) / 100.0;
    /* let reduceKpRange: number = controllerAccountKp / 100.0;
    if (reduceKpRange == 0) {
      kpFactor = 0.1;
    } else if (reduceKpRange <= 1 && reduceKpRange > 0) {
      kpFactor = reduceKpRange;
    } else {
      kpFactor = Math.sqrt(reduceKpRange);
    } */
  }

  /*const REDUCE_FACTOR = new BN(1e10);
  let reduce = amount?.div(REDUCE_FACTOR);
   const convert = useCall<Balance>(api.derive.kp.stakeToVoteEvulate, [controllerId, reduce]);

  if (convert != undefined) {
    amountVote = convert.mul(REDUCE_FACTOR);
  } */


  return (
    <div className={className}>
      <Modal.Columns>
        <Modal.Column>
          <InputAddress
            label={t<string>('stash account')}
            onChange={setStashId}
            type='account'
            value={stashId}
          />
          <InputAddress
            help={t<string>('The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.')}
            label={t<string>('controller account')}
            onChange={setControllerId}
            type='account'
            value={controllerId}
          />
          <InputValidationController
            accountId={stashId}
            controllerId={controllerId}
            onError={_setError}
          />
        </Modal.Column>
        <Modal.Column>
          <p>{t<string>('Think of the stash as your cold wallet and the controller as your hot wallet. Funding operations are controlled by the stash, any other non-funding actions by the controller itself.')}</p>
          <p>{t<string>('To ensure optimal fund security using the same stash/controller is strongly discouraged, but not forbidden.')}</p>
        </Modal.Column>
      </Modal.Columns>
      {startBalance && (
        <Modal.Columns>
          <Modal.Column>
            <InputBalance
              autoFocus
              defaultValue={startBalance}
              help={t<string>('The total amount of the stash balance that will be at stake in any forthcoming rounds (should be less than the free amount available)')}
              isError={!hasValue || !!amountError?.error}
              label={t<string>('value bonded')}
              labelExtra={
                <BalanceFree
                  label={<span className='label'>{t<string>('balance')}</span>}
                  params={stashId}
                />
              }
              onChange={setAmount}
            />

            <InputValidateAmount
              controllerId={controllerId}
              onError={setAmountError}
              stashId={stashId}
              value={amount}
            />

            <InputBalanceChanges
              autoFocus
              defaultValue={powerWeighted}
              isDisabled={true}
              help={t<string>("The calculation power weighted value refers to the final value of the mortgage's KPT after calculation power weighted, which is calculated by multiplying the number of KPT by the calculation power weighted multiple.")}
              isError={false}
              label={t<string>('KP weighted value')}
              labelExtra={
                <span className='label'>{t<string>('KPValue')} {controllerAccountKp?.toString()+' KP'} </span>
              }
            />

            {bondedBlocks?.gtn(0) && (
              <Static
                help={t<string>('The bonding duration for any staked funds. Needs to be unlocked and withdrawn to become available.')}
                label={t<string>('on-chain bonding duration')}
              >
                <BlockToTime blocks={bondedBlocks} />
              </Static>
            )}
          </Modal.Column>
          <Modal.Column>
            <p>{t<string>('Chain ownership rights and interests is the KP weighting of KPT. The current computational power value is the current value, and the actual KP weighting is based on the actual occurrence time node.')}</p>
            <p>{t<string>('')}</p>
          </Modal.Column>
        </Modal.Columns>
      )}
      <Modal.Columns>
        <Modal.Column>
          <Dropdown
            defaultValue={0}
            help={t<string>('The destination account for any payments as either a nominator or validator')}
            label={t<string>('payment destination')}
            onChange={setDestination}
            options={options}
            value={destination}
          />
          {isAccount && (
            <InputAddress
              help={t('An account that is to receive the rewards')}
              label={t('the payment account')}
              onChange={setDestAccount}
              type='account'
              value={destAccount}
            />
          )}
        </Modal.Column>
        <Modal.Column>
          <p>{t<string>('Rewards (once paid) can be deposited to either the stash or controller, with different effects.')}</p>
        </Modal.Column>
      </Modal.Columns>
    </div>
  );
}

export default React.memo(Bond);

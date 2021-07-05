// Copyright 2017-2020 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { PowerSize} from '@polkadot/types/interfaces';
import React from 'react';
import { useApi, useCall } from '@polkadot/react-hooks';

interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function TotalIssuance ({ children, className = '', label }: Props): React.ReactElement<Props> {
  const { api } = useApi();
  const totalPower = useCall<PowerSize>(api.query.kp.totalPower);
  console.log('totalPower:', totalPower?.toJSON());

  let totalValue: number=0;
  if(!!totalPower){
      totalValue=Number(totalPower.toString()) / 100.0;
  }
  let totalValueStr: String = parseFloat(totalValue+'').toFixed(2).toString()+' KP';

  return (
    <div className={className}>
      {label || ''}
      {totalValue ? totalValueStr:'0.00KP'}

      {children}
    </div>
  );
}

export default React.memo(TotalIssuance);

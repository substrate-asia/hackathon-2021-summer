// Copyright 2017-2020 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
/* import { useApi } from '@polkadot/react-hooks'; */


interface Props {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
}

function Chain ({ children, className = '', label }: Props): React.ReactElement<Props> {
/*  const { t } = useTranslation();
  const { systemChain } = useApi(); */
  const systemChainNew='测试版v1.0';
  return (
    <div className={className}>
     {/*label || ''*/}{/*systemChain || t('Unknown')*/}{/*children*/}
     {systemChainNew}
    </div>
  );
}

export default React.memo(Chain);

// Copyright 2017-2020 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ThemeProps } from '@polkadot/react-components/types';

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';
import { Compact } from '@polkadot/types';

interface Props {
  children?: React.ReactNode;
  className?: string;
  isShort?: boolean;
  label?: React.ReactNode;
  labelPost?: string;
  value?: Compact<any> | BN | string | null | 'all';
  withCurrency?: boolean;
  withSi?: boolean;
}

function FormatBalance ({ children, className = '', isShort, label, labelPost, value, withCurrency, withSi }: Props): React.ReactElement<Props> {

   const newValue=value+' KP';
  // labelPost here looks messy, however we ensure we have one less text node
  return (
    <div className={`ui--FormatBalance ${className}`}>
      {label ? <>{label}&nbsp;</> : ''}
      <span className='ui--FormatBalance-value'>{newValue}</span>{children}
    </div>
  );
}

export default React.memo(styled(FormatBalance)(({ theme }: ThemeProps) => `
  display: inline-block;
  vertical-align: baseline;
  white-space: nowrap;

  * {
    vertical-align: baseline !important;
  }

  > label,
  > .label {
    display: inline-block;
    margin-right: 0.25rem;
    vertical-align: baseline;
  }

  .ui--FormatBalance-unit {
    font-size: 0.825em;
  }

  .ui--FormatBalance-value {
    text-align: right;

    > .ui--FormatBalance-postfix {
      font-weight: ${theme.fontWeightLight};
      opacity: 0.7;
      vertical-align: baseline;
    }
  }

  > .ui--Button {
    margin-left: 0.25rem;
  }

  .ui--Icon {
    margin-bottom: -0.25rem;
    margin-top: 0.25rem;
  }

  .ui--Icon+.ui--FormatBalance-value {
    margin-left: 0.375rem;
  }
`));

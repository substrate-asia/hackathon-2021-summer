import React, { useState } from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const CustomRadio = ({
  id,
  label,
  value,
  className,
  isChecked,
  handleClick,
  ...props
}) => {
  return (
    <InputWrapper className={isChecked ? 'active' : ''} {...props}>
      <input
        id={id}
        type="radio"
        value={value}
        checked={isChecked}
        name="donation-amount"
        onChange={handleClick}
      />
      <label htmlFor={id}>{label}</label>
    </InputWrapper>
  );
};

export default CustomRadio;

const InputWrapper = styled.div`
  border: 1px solid ${themeGet('colors.border')};
  border-radius: 4px;
  display: inline-flex;
  position: relative;
  cursor: pointer;
  &.active {
    background-color: rgba(255, 130, 92, 0.1);
    border-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.primary')};
  }
  input {
    height: 60px;
    margin: 0;
    width: 90px;
    opacity: 0;
    z-index: 3;
    cursor: pointer;
  }
  label {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 18px;
    line-height: 1.11;
    font-weight: 700;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
`;

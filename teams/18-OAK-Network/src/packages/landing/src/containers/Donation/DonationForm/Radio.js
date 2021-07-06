import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const Radio = ({
  id,
  label,
  value,
  className,
  isChecked,
  handleClick,
  ...props
}) => {
  return (
    <InputWrapper className={isChecked ? 'active' : ''}>
      <input
        id={id}
        type="radio"
        value={value}
        checked={isChecked && isChecked}
        name="donation-type"
        onChange={handleClick}
      />
      <label htmlFor={id}>{label}</label>
    </InputWrapper>
  );
};

export default Radio;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 20px;
  &::before,
  &::after {
    border-radius: 50%;
    content: '';
    left: 0;
    height: 20px;
    position: absolute;
    width: 20px;
    transition: 0.3s ease-in-out 0s;
    backface-visibility: hidden;
  }

  &::before {
    border: 1px solid #d7e1e7;
  }
  &.active {
    &::before {
      background-color: ${themeGet('colors.primary')};
      border-color: ${themeGet('colors.primary')};
    }
    &::after {
      background-color: ${themeGet('colors.white')};
      height: 10px;
      left: 5px;
      width: 10px;
    }
  }
  label {
    cursor: pointer;
    margin-left: 10px;
  }
  input {
    margin: 0;
    opacity: 0;
    position: absolute;
  }
`;

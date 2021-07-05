import React from 'react';
import { rgba } from 'polished';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const TabTitle = ({ step, title }) => {
  return (
    <TitleWrapper>
      <span>{step}</span> {title}
    </TitleWrapper>
  );
};

export default TabTitle;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${rgba('#02073E', 0.4)};
  span {
    background-color: #e8eaed;
    height: 25px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: ${rgba('#0f2137', 0.7)};
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    margin-right: 10px;
  }
`;

import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';

const SectionHeading = ({ title, desc, ...props }) => {
  return (
    <HGroup {...props}>
      <Heading as="h2" content={title} />
      <Text content={desc} />
    </HGroup>
  );
};

export default SectionHeading;

const HGroup = styled.hgroup`
  margin-bottom: ${(props) => props.mb ?? '50px'};
  text-align: ${(props) => props.textAlign ?? 'center'};
  max-width: 527px;
  margin: 0 auto 50px;
  h2 {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 700;
    font-size: 30px;
    line-height: 1.67;
    margin-bottom: 15px;
    @media only screen and (max-width: 767px) {
      font-size: 24px;
    }
  }
  p {
    color: ${themeGet('colors.textPrimary')};
    font-size: 15px;
    line-height: 2.33;
    margin: 0;
  }
`;

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const HGroup = styled.hgroup`
  margin-bottom: ${(props) => props.mb ?? '50px'};
  @media (max-width: 480px) {
    margin-bottom: ${(props) => props.mb ?? '30px'};
  }
  text-align: ${(props) => props.textAlign ?? 'center'};
  h4 {
    color: ${themeGet('colors.tertiary')};
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
    margin: 0;
    @media (max-width: 1440px) {
      line-height: 2;
    }
  }
  h2 {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 500;
    font-size: 24px;
    line-height: 50px;
    letter-spacing: -0.5px;
    margin: 0;
    @media (max-width: 480px) {
      font-size: 18px;
      line-height: 34px;
    }
  }
`;

export default HGroup;

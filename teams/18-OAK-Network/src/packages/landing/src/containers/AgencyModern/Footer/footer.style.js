import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const FooterWrapper = styled.footer`
  padding: 75px 0;
  @media only screen and (max-width: 480px) {
    padding: 50px 0 30px;
  }
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 991px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  > div {
    @media only screen and (max-width: 991px) {
      flex-wrap: wrap;
      width: 33%;
      margin-bottom: 30px;
    }
    @media only screen and (max-width: 480px) {
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 30px;
    }
  }
`;

export const CopyrightInfo = styled.div`
  margin-right: 0px;
  p {
    font-size: 14px;
    line-height: 18px;
    margin-top: 24px;
    a {
      color: ${themeGet('colors.headingColor')};
    }
  }
  .copyright {
    color: ${rgba('#0f2137', 0.6)};
    margin-top: 20px;
  }
`;

export const FooterWidget = styled.div`
  h4 {
    font-family: DM Sans;
    letter-spacing: -0.5px;
    color: ${themeGet('colors.headingColor')};
    font-weight: 500;
    font-size: 18px;
    line-height: 30px;
  }
`;

export const Nav = styled.nav`
  a {
    color: ${rgba('#02073E', 0.8)};
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 2.5;
    transition: 0.3s ease 0s;
    img {
      margin-right: 12px;
    }
    &:hover {
      color: ${themeGet('colors.primary')};
    }
  }
`;

export default FooterWrapper;

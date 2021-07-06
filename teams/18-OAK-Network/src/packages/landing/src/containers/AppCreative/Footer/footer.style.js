import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const FooterWrapper = styled.footer`
  padding: 60px 0 100px;
  @media only screen and (max-width: 624px) {
    padding: 50px 0 80px;
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -35px;
  @media only screen and (min-width: 1367px) {
    padding-left: 30px;
    padding-right: 30px;
  }
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
    @media only screen and (max-width: 768px) {
      width: 50%;
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
    font-size: 15px;
    line-height: 18px;
    margin-top: 20px;
    margin-bottom: -3px;
    a {
      color: ${themeGet('colors.primary')};
      display: inline-block;
      padding-left: 5px;
      font-weight: 700;
      text-decoration: underline;
      &:hover {
        color: ${themeGet('colors.headingColor')};
      }
    }
  }
  .copyright {
    color: ${themeGet('colors.headingColor')};
    margin-bottom: 25px;
    margin-top: 12px;
  }
  .social__share > a {
    display: inline-block;
    padding-right: 15px;
    &.facebook {
      color: #3b5998;
    }
    &.twitter {
      color: #55acee;
    }
    &.dribbble {
      color: #e74d89;
    }
    &:hover {
      color: ${themeGet('colors.primary')} !important;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const FooterWidget = styled.div`
  h4 {
    letter-spacing: -0.5px;
    color: ${themeGet('colors.headingColor')};
    font-weight: 500;
    font-size: 17px;
    line-height: 30px;
    margin-bottom: 25px;
    @media only screen and (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
`;

export const Nav = styled.nav`
  a {
    color: ${rgba('#02073E', 0.8)};
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.6;
    transition: 0.3s ease 0s;
    padding-bottom: 12px;
    &:last-child {
      padding-bottom: 0px;
    }
    img {
      margin-right: 12px;
    }
    &:hover {
      color: ${themeGet('colors.primary')};
    }
  }
`;

export default FooterWrapper;

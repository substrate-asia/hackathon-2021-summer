import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.footer`
  background-color: #f1f5f8;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const Copyright = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
  @media only screen and (max-width: 480px) {
    display: block;
    text-align: center;
    margin-bottom: 40px;
    figure {
      img {
        margin: 0 auto 15px;
      }
    }
  }
  p {
    margin: 0 0 0 15px;
  }
`;

export const Nav = styled.ul`
  display: flex;
  @media only screen and (max-width: 768px) {
    justify-content: center;
    margin-top: 20px;
  }
  li {
    margin: 0 15px;
    @media only screen and (max-width: 480px) {
      margin: 0 9px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    a {
      color: ${themeGet('colors.textPrimary')};
    }
  }
`;

export const SocialProfiles = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    justify-content: center;
    margin-top: 30px;
  }
  span {
    font-size: 15px;
    margin-right: 5px;
  }
`;

export const Icons = styled.div`
  display: flex;
  a {
    align-items: center;
    display: inline-flex;
    margin-left: 15px;
  }
`;

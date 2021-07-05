import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

export const FooterWrapper = styled.footer`
  background-color: #f6ebe6;
  padding-top: 80px;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
  }
`;

export const Subscription = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 70px;
  @media only screen and (max-width: 768px) {
    display: block;
    text-align: center;
    max-width: 570px;
    margin: 0 auto 50px;
  }
  h2 {
    margin: 0;
    font-size: 36px;
    line-height: 1.68;
    letter-spacing: -1px;
    color: #0f2137;
    @media only screen and (max-width: 1200px) {
      font-size: 32px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 28px;
    }
    @media only screen and (max-width: 768px) {
      margin-bottom: 30px;
      line-height: 1.4;
    }
    @media only screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

export const SubscriptionForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 480px) {
    display: block;
  }
  .input-field {
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
    input {
      border: 0;
      min-height: 60px;
      min-width: 360px;
      padding: 0 24px;
      ::placeholder {
        color: ${rgba('#02073E', 0.4)};
      }
      @media only screen and (max-width: 1024px) {
        min-width: 290px;
      }
      @media only screen and (max-width: 768px) {
        min-height: 50px;
      }
    }
  }
  button {
    min-height: 60px;
    padding: 0 30px;
    margin-left: 15px;
    @media only screen and (max-width: 768px) {
      min-height: 50px;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
      margin-left: 0;
      margin-top: 15px;
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e4d8d2;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 40px;
  @media only screen and (max-width: 480px) {
    display: block;
  }
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 480px) {
    margin-bottom: 30px;
    display: block;
    text-align: center;
  }
  img {
    max-width: 110px;
    margin-right: 10px;
    @media only screen and (max-width: 480px) {
      margin: 0 auto 15px;
    }
  }
  p {
    font-size: 15px;
    line-height: 1.2;
    margin-bottom: 0;
  }
`;

export const FooterNav = styled.ul`
  display: flex;
  align-items: center;
  li {
    a {
      font-size: 15px;
      line-height: 1.33;
      display: inline-flex;
      margin-left: 20px;
      color: ${themeGet('colors.textPrimary')};
      &:hover {
        color: ${themeGet('colors.primary')};
      }
    }
    &:first-child a {
      margin-left: 0;
    }
  }
`;

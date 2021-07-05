import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  position: relative;
  z-index: 0;
  &::before {
    background-color: #f1f5f8;
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 280px;
    width: 100%;
    z-index: -1;
    @media only screen and (max-width: 768px) {
      height: 250px;
    }
  }
`;

export const ContentWrapper = styled.div`
  background-color: ${themeGet('colors.primary')};
  border-radius: 10px;
  padding-top: 70px;
  padding-bottom: 90px;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
    padding-bottom: 55px;
  }
  @media only screen and (max-width: 480px) {
    padding: 30px;
  }
`;

export const SubscriptionWrapper = styled.div`
  margin: 0 auto;
  max-width: 584px;
  text-align: center;
  h2 {
    color: ${themeGet('colors.white')};
    font-weight: 700;
    font-size: 48px;
    line-height: 1.21;
    letter-spacing: -0.02em;
    margin-bottom: 50px;
    @media only screen and (max-width: 1200px) {
      font-size: 44px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 32px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
      margin-bottom: 30px;
    }
  }
`;

export const SubscriptionForm = styled.form`
  display: flex;
  @media only screen and (max-width: 480px) {
    display: block;
  }
  .input-field {
    input {
      border-radius: 10px 0 0 10px;
      min-height: 70px;
      min-width: 335px;
      padding-left: 30px;
      @media only screen and (max-width: 768px) {
        min-height: 60px;
      }
      @media only screen and (max-width: 480px) {
        border-radius: 10px;
        min-height: 50px;
        min-width: auto;
      }
    }
  }
  button {
    background: #1a0047;
    border-radius: 0px 10px 10px 0px;
    font-weight: 700;
    padding: 0 30px;
    width: 100%;
    @media only screen and (max-width: 480px) {
      border-radius: 10px;
      margin-top: 15px;
    }
  }
`;

export const Features = styled.ul`
  display: flex;
  justify-content: center;
  margin: 40px 0 0 0;
  @media only screen and (max-width: 480px) {
    display: block;
    margin-top: 30px;
  }
  li {
    font-weight: 500;
    font-size: 15px;
    line-height: 1.29;
    color: ${themeGet('colors.white')};
    margin-right: 18px;
    display: flex;
    align-items: center;
    &:last-child {
      margin-right: 0;
    }
    i {
      display: inline-flex !important;
      margin-right: 8px;
      color: ${themeGet('colors.white')};
    }
    @media only screen and (max-width: 480px) {
      line-height: 1.8;
    }
  }
`;

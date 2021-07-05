import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  position: relative;
  z-index: 10;
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const Content = styled.div`
  background-color: ${themeGet('colors.primaryLight', '#925B9F')};
  border-radius: 15px;
  padding: 52px 100px;
  position: relative;
  overflow: hidden;
  @media only screen and (max-width: 1366px) {
    padding: 45px 60px;
  }
  @media only screen and (max-width: 1219px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media only screen and (max-width: 480px) {
    padding: 45px 25px;
  }
  > img {
    position: absolute;
    &:nth-child(1) {
      left: -90px;
      top: -10px;
      @media only screen and (max-width: 991px) {
        width: 42%;
        top: 30px;
      }
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
    &:nth-child(2) {
      right: 0;
      top: 0;
      @media only screen and (max-width: 991px) {
        width: 90%;
      }
    }
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
  h3 {
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    line-height: 1.42;
    letter-spacing: -1px;
    max-width: 52%;
    margin-bottom: 0;
    @media only screen and (max-width: 991px) {
      max-width: 60%;
      font-size: 24px;
    }
    @media only screen and (max-width: 768px) {
      max-width: none;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  button {
    background-color: #fff;
    color: ${themeGet('colors.primaryLight', '#925B9F')};
    margin: 15px 0;
    font-size: 20px;
    line-height: 1.2em;
    font-weight: 700;
    border-radius: 7px;
    padding: 22px 45px;
    @media only screen and (max-width: 991px) {
      font-size: 18px;
      padding: 16px 25px;
    }
    @media only screen and (max-width: 768px) {
      margin: 25px 0 10px;
    }
    &:hover {
      box-shadow: 0px 9px 20px -5px rgba(108, 36, 126, 0.57);
    }
  }
`;

export default SectionWrapper;

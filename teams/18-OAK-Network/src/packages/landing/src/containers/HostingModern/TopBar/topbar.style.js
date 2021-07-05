import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const TopBarWrapper = styled.div`
  background-color: ${themeGet('colors.primary')};
  color: #fff;
  padding: 15px 0;
  font-size: 14px;
  display: ${(props) => (props.isHide ? 'none' : 'block')};
`;

export const TopbarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  @media only screen and (max-width: 767px) {
    display: none;
  }
  .caption {
    margin: 0;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 768px) {
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    img {
      margin-right: 16px;
    }
    .tlds {
      margin-left: 40px;
    }
  }
  .dealsLink {
    font-weight: 700;
    color: #fff;
    margin-left: 80px;
    display: inline-flex;
    align-items: center;
    i {
      display: inline-flex;
      margin-left: 8px;
    }
    @media only screen and (max-width: 768px) {
      margin-left: 40px;
    }
  }
  .closeTopBar {
    padding: 0;
    min-width: auto;
    min-height: auto;
    opacity: 0.5;
    margin-left: 30px;
  }
`;

export const TopBarMobile = styled.div`
  display: none;
  @media only screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .caption {
    margin: 0 0 20px;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 767px) {
      margin: 0;
    }

    img {
      margin-right: 16px;
    }
    > span {
      @media only screen and (max-width: 767px) {
        font-size: 11px;
      }
    }
  }
  p {
    @media only screen and (max-width: 767px) {
      text-align: center;
      margin-top: 10px;
    }

    .tlds {
      display: block;
      margin-bottom: 15px;
      @media only screen and (max-width: 767px) {
        display: block;
        margin-bottom: 15px;
        font-size: 12px;
      }
    }
    .dealsLink {
      font-weight: 700;
      color: #fff;
      margin-left: 80px;
      display: inline-flex;
      align-items: center;
      @media only screen and (max-width: 767px) {
        color: #fff;
      }
      i {
        display: inline-flex;
        margin-left: 8px;
      }
      @media only screen and (max-width: 768px) {
        margin-left: 0;
      }
    }
  }
  .closeTopBar {
    padding: 0;
    min-width: auto;
    min-height: auto;
    opacity: 0.5;
    margin-left: 30px;
    @media only screen and (max-width: 767px) {
      margin-left: 0;
    }
  }
`;

export const Wrapper = styled.div``;

export default TopBarWrapper;

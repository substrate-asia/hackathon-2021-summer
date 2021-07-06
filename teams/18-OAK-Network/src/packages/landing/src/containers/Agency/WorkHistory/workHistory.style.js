import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const WorkHistoryWrapper = styled.section`
  padding: 70px 0 80px;
  overflow: hidden;
  @media (max-width: 990px) {
    padding: 50px 0 60px 0;
  }
  .feature__block {
    padding-right: 132px;
    @media only screen and (max-width: 1200px) {
      padding-right: 32px;
    }
    @media only screen and (max-width: 991px) {
      padding-right: 0;
      margin-bottom: 0;
    }
    @media only screen and (max-width: 767px) {
      padding-right: 0;
      margin-bottom: 40px;
    }
    .reusecore__button {
      transition: all 0.3s ease;
      &:hover {
        box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
      }
    }
  }
`;

const CounterUpArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;

  @media only screen and (max-width: 1200px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 991px) {
    padding-right: 0;
    margin-left: -25px;
  }
  @media only screen and (max-width: 480px) {
    margin-left: 0;
  }
  .card {
    width: calc(50% - 25px);
    margin-left: 25px;
    margin-bottom: 27px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.3s ease-in-out;
    @media (max-width: 767px) {
      width: calc(50% - 13px);
      &:nth-child(2n + 1) {
        margin-left: 0;
      }
    }

    &:hover {
      box-shadow: 0px 16px 35px 0px rgba(16, 66, 97, 0.1);
    }

    h3 {
      font-size: 60px;
      font-weight: 300;
      margin: 0 0 20px;
      color: ${themeGet('colors.headingColor', '#0f2137')};
      @media (max-width: 990px) {
        font-size: 40px;
      }
      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
    }

    p {
      color: ${themeGet('colors.headingColor', '#0f2137')};
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 7px;
      @media (max-width: 990px) {
        font-size: 14px;
        text-align: center;
      }
    }

    a {
      color: ${themeGet('colors.linkColor', '#2b9eff')};
      font-weight: 500;
      font-size: 15px;
      text-decoration: underline;
      margin-top: 7px;
      @media (max-width: 1190px) {
        font-size: 14px;
        text-align: center;
      }
    }

    &:nth-child(even) {
      position: relative;
      top: 22px;
    }

    &:last-child {
      box-shadow: none;
      border-radius: 5px;
      border: 2px dashed ${themeGet('colors.inactiveIcon', '#ebebeb')};
    }
  }
`;

export { CounterUpArea };
export default WorkHistoryWrapper;

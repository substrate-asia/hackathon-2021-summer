import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const WorkHistoryWrapper = styled.section`
  padding: 70px 0 80px;
  overflow: hidden;
  @media (max-width: 990px) {
    padding: 50px 0 60px 0;
  }
  @media (max-width: 480px) {
    padding: 50px 0 0px 0;
  }
  .feature__block {
    padding-left: 132px;
    margin-top: -120px;
    @media only screen and (max-width: 1200px) {
      padding-right: 32px;
      padding-left: 15px;
    }
    @media only screen and (max-width: 991px) {
      padding-right: 0;
      margin-bottom: 0;
    }
    @media only screen and (max-width: 767px) {
      padding-right: 0;
      margin-bottom: 40px;
      margin-top: 0;
    }
    h2 {
      font-size: 48px;
      line-height: 1.2;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      color: #fff;
      max-width: 270px;
      @media only screen and (max-width: 1440px) {
        font-size: 38px;
        max-width: 100%;
      }
      @media only screen and (max-width: 767px) {
        font-size: 25px;
        max-width: 100%;
      }
    }
    p {
      color: #496b96;
      font-size: 16px;
      line-height: 33px;
      font-weight: 400;
    }
    .reusecore__button {
      transition: all 0.3s ease;
      color: #fff;
      margin-left: 0;
      padding-left: 0;
      justify-content: flex-start;
      .flaticon-next {
        margin-top: 3px;
      }
    }
  }
`;

const CounterUpArea = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 1200px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 991px) {
    padding-right: 0;
    margin-left: -25px;
  }
  @media only screen and (max-width: 767px) {
    margin-left: 0;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .card {
    width: calc(50% - 25px);
    margin-left: 25px;
    margin-bottom: 27px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    background-color: #152149;
    cursor: pointer;
    @media (max-width: 767px) {
      width: calc(50% - 13px);
      &:nth-child(2n + 1) {
        margin-left: 0;
      }
    }

    &:hover {
      background-image: linear-gradient(to right, #1d7ccb 30%, #1951b8 100%);
      box-shadow: 0px 16px 57px 0px rgba(22, 53, 76, 0.7);
    }

    h3 {
      font-size: 30px;
      font-weight: 400;
      margin: 30px 0 10px;
      color: ${themeGet('colors.white', '#fff')};
      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
    }

    p {
      color: rgba(142, 199, 255, 0.502);
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 7px;
      @media (max-width: 990px) {
        font-size: 14px;
        text-align: center;
      }
    }

    img {
      opacity: 0.2;
    }

    &:nth-child(even) {
      position: relative;
      top: -70px;
    }
  }
`;

export { CounterUpArea };
export default WorkHistoryWrapper;

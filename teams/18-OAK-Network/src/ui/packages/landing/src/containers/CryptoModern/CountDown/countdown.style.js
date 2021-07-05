import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding: 75px 0;
  overflow: hidden;

  @media only screen and (max-width: 1440px) {
    padding: 100px 0 50px;
  }
  @media only screen and (max-width: 480px) {
    padding: 60px 0 5px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 480px) {
    flex-wrap: nowrap;
    align-items: center;
  }

  h2 {
    color: ${themeGet('colors.white', '#fff')};
    font-size: 32px;
    line-height: 44px;
    font-weight: 400;
    margin-bottom: 27px;
    @media only screen and (max-width: 1366px) {
      font-size: 30px;
      line-height: 42px;
      margin-bottom: 20px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 26px;
      line-height: 38px;
    }
    @media only screen and (max-width: 768px) {
      max-width: 100%;
    }
    @media only screen and (max-width: 480px) {
      margin-bottom: 0px;
    }
  }

  .timerCount {
    margin-top: 30px;
    margin-bottom: 60px;

    .NormalClock {
      display: flex;
      justify-content: space-between;
      width: 600px;
      align-items: center;
      @media (max-width: 480px) {
        width: 100%;
      }
      .NormalUnitContainer {
        width: 110px;
        height: 100px;
        border-radius: 5px;
        background-color: #0b1741;
        @media (max-width: 480px) {
          width: 70px;
          height: 70px;
          background-color: transparent;
        }
        .NormalupperCard {
          align-items: center;
          display: flex;
          justify-content: center;
          span {
            font-size: 60px;
            letter-spacing: -1px;
            color: #ffffff;
            font-family: 'Roboto';
            font-weight: 300;
            text-align: center;
            @media (max-width: 480px) {
              font-size: 30px;
            }
          }
        }
        .digitLabel {
          font-size: 14px;
          letter-spacing: 3px;
          color: #8ec7ff;
          font-family: 'Roboto';
          font-weight: 500;
          text-align: center;
          margin-top: 12px;
          @media (max-width: 480px) {
            font-size: 10px;
          }
        }
      }
      .dividerColon {
        font-size: 36px;
        line-height: 48px;
        color: #fff;
        font-family: 'Roboto';
        font-weight: 700;
        text-align: center;
        @media (max-width: 480px) {
          display: none;
        }
      }
    }
  }
  .reusecore__button {
    text-transform: inherit;
    border-radius: 5px;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    margin-top: 30px;

    &.primary {
      background-image: linear-gradient(to right, #4ba1d8, #4464bd 95%);
      &:hover {
        box-shadow: rgba(75, 109, 235, 0.78) 0px 9px 20px -10px;
      }
    }
  }
`;

export default SectionWrapper;

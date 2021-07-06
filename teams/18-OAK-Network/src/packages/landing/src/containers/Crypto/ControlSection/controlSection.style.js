import styled from 'styled-components';

const ControlWrapper = styled.section`
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1440px) {
    padding: 0;
  }

  .colleft {
    width: 50%;
    @media (max-width: 1440px) {
      width: 50%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .colright {
    width: calc(50% - 70px);
    margin-left: 70px;
    display: flex;
    flex-direction: column;
    @media (max-width: 1440px) {
      width: calc(50% - 70px);
    }
    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
      margin-top: 100px;
    }
    @media (max-width: 480px) {
      margin-top: 50px;
    }
    .readMoreSection {
      .readMore {
        font-size: 20px;
        font-weight: 500;
        font-family: 'Poppins';
        @media (max-width: 480px) {
          font-size: 16px;
        }
      }
    }
    .countDownSection {
      margin-top: 30px;
      .readMore {
        font-size: 20px;
        font-weight: 500;
        font-family: 'Poppins';
        color: #32325d;
        @media (max-width: 480px) {
          font-size: 16px;
        }
      }
      .countPortion {
        display: flex;
        .countSingle {
          display: flex;
          flex-direction: column;
          margin-right: 50px;
          font-size: 30px;
          font-weight: 700;
          font-family: 'Poppins';
          color: #32325d;
          justify-content: center;
          align-items: center;
          .countText {
            font-size: 16px;
            font-weight: 400;
            font-family: 'Poppins';
            color: #525f7f;
          }
        }
      }
      @media (max-width: 480px) {
        display: none;
      }
    }
    .countDownButton {
      position: relative;
      margin-top: 40px;
      .countDownMainButton {
        border-radius: 6px;
        background-image: -moz-linear-gradient(
          29deg,
          rgb(255, 148, 147) 0%,
          rgb(255, 120, 162) 100%
        );
        background-image: -webkit-linear-gradient(
          29deg,
          rgb(255, 148, 147) 0%,
          rgb(255, 120, 162) 100%
        );
        background-image: -ms-linear-gradient(
          29deg,
          rgb(255, 148, 147) 0%,
          rgb(255, 120, 162) 100%
        );
        &:hover {
          box-shadow: -6.691px 7.431px 20px 0px rgba(255, 131, 157, 0.2);
        }
        > span {
          font-weight: 700;
          letter-spacing: 1px;
        }
      }
      .countDownDiscountButton {
        position: absolute;
        top: 32px;
        height: 34px;
        min-height: 34px;
        min-width: 120px;
        padding-top: 5px;
        left: 73px;
        &:hover {
          box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.5);
        }
      }
    }
  }
`;

export { ControlWrapper };

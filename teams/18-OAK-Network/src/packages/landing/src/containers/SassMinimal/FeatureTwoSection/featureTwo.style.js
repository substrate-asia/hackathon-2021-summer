import styled from 'styled-components';

export const FeatureTwoWrapper = styled.section`
  position: relative;
  padding-top: 125px;
  padding-bottom: 125px;
  @media (max-width: 991px) {
    padding-bottom: 50px;
  }
  @media (max-width: 767px) {
    padding-top: 80px;
    padding-bottom: 30px;
  }
  .container {
    .row {
      display: flex;
      flex-wrap: wrap;

      .column {
        flex: 1 1 50%;

        @media (max-width: 991px) {
          flex: 1 1 100%;

          .react-reveal img {
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top: 40px;
          }
        }
      }
    }
  }
  .blockTitle {
    margin-bottom: 30px;

    @media (max-width: 991px) {
      width: 100%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    h2,
    p {
      margin: 0;
    }
    h2 {
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 1.33;
      letter-spacing: -0.04em;
      color: #0f2137;

      @media (max-width: 787px) {
        font-size: 32px;
      }
      @media (max-width: 575px) {
        font-size: 26px;
      }

      @media (max-width: 375px) {
        font-size: 22px;
        margin-top: 10px;
      }
    }
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 1.31;
      letter-spacing: -0.01em;
      text-transform: capitalize;
      color: #c36276;
    }
  }

  .featureTwoContent {
    padding-right: 134px;
    @media (max-width: 1199px) {
      padding-right: 50px;
    }
    @media (max-width: 991px) {
      padding-right: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: space-between;
    }
  }

  .featureTwoBox {
    background: #ffffff;
    border: 1px solid #eae9f2;
    border-radius: 10px;
    position: relative;
    padding-left: 115px;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-right: 45px;
    transition: all 500ms ease;

    @media (max-width: 991px) {
      flex: 1 1 calc(50% - 15px);
    }
    @media (max-width: 645px) {
      flex: 1 1 100%;
    }
    @media (max-width: 375px) {
      padding-left: 15px;
      padding-right: 15px;
      text-align: center;
    }
    &:hover {
      background: #ffffff;
      box-shadow: 0px 15px 40px rgba(105, 111, 135, 0.1);
      border-color: #fff;
    }
    + .featureTwoBox {
      margin-top: 20px;
      @media (max-width: 991px) {
        margin-top: 0;
      }
    }
    > img {
      position: absolute;
      top: 25px;
      left: 28px;
      transition: transform 500ms ease;

      @media (max-width: 375px) {
        position: relative;
        top: auto;
        left: auto;
        margin-bottom: 15px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }
    h3,
    p {
      margin: 0;
    }
    h3 {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 1.27;
      color: #0f2137;
      margin-bottom: 15px;
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 1.87;
      color: #343d48;
    }
  }
`;

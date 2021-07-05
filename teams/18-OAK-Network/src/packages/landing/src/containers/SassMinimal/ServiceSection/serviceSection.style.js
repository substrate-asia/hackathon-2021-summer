import styled from 'styled-components';

export const ServiceWrapper = styled.section`
  position: relative;
  background-color: #fff9f5;
  padding-top: 90px;
  padding-bottom: 10px;

  @media (max-width: 625px) {
    padding-top: 70px;
    padding-bottom: 30px;
  }
  .container {
    .blockTitle {
      text-align: center;
      margin-bottom: 85px;

      @media (max-width: 625px) {
        margin-bottom: 45px;
      }

      h2,
      p {
        margin: 0;
      }
      h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 26px;
        line-height: 1.15;
        text-align: center;
        letter-spacing: -0.03em;
        color: #09131f;

        @media (max-width: 375px) {
          font-size: 22px;
        }
      }
      p {
        margin: 0;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 1.32;
        color: #858b91;
        margin-top: 15px;
      }
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      margin-left: -33px;
      margin-right: -33px;

      @media (max-width: 1199px) {
        margin-left: -15px;
        margin-right: -15px;
      }
    }

    .column {
      flex: 1 1 33.333%;
      padding-left: 33px;
      padding-right: 33px;
      @media (max-width: 1199px) {
        padding-left: 15px;
        padding-right: 15px;
      }

      @media (max-width: 991px) {
        flex: 1 1 50%;
      }

      @media (max-width: 625px) {
        flex: 1 1 100%;
      }
    }
  }
  .serviceBox {
    position: relative;
    padding-left: 110px;
    margin-bottom: 90px;

    @media (max-width: 625px) {
      margin-bottom: 40px;
    }
    @media (max-width: 375px) {
      padding-left: 0;
      text-align: center;
    }
    > img {
      position: absolute;
      top: 0;
      left: 0;
      transform: rotateY(0deg) perspective(100px);
      transition: transform 500ms ease;

      @media (max-width: 375px) {
        position: relative;
        top: auto;
        left: auto;
        margin-bottom: 15px;
        margin-left: auto;
        margin-right: auto;
      }
    }
    &:hover {
      > img {
        transform: rotateY(180deg) perspective(0px);
      }
    }
    h3 {
      margin: 0;
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 176%;
      letter-spacing: -0.01em;
      color: #0f2137;
      margin-bottom: 10px;
    }
    p {
      margin: 0;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 1.73;
      color: #343d48;
    }
  }
`;

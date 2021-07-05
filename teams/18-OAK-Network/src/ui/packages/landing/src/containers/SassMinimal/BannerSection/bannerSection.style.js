import styled from 'styled-components';

export const BannerWrapper = styled.section`
  position: relative;
  width: 100%;
  padding-top: 140px;
  background-image: linear-gradient(
    130.92deg,
    #3a1c71 -14.59%,
    #d76d77 38.47%,
    #ffaf7b 98.62%
  );
  margin-bottom: 135px;

  @media (max-width: 767px) {
    padding-top: 110px;
  }

  @media (max-width: 480px) {
    margin-bottom: 0;
    padding-bottom: 80px;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;

    > span {
      font-family: DM Sans;
      font-style: normal;
      font-weight: 500;
      display: block;
      color: #fff;
      opacity: 0.6;
      font-size: 15px;
      margin-top: 15px;
    }
  }
  h3 {
    margin: 0;
    color: #fff;
    font-style: normal;
    font-weight: bold;
    font-size: 62px;
    line-height: 70px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    white-space: pre-line;

    @media (max-width: 1440px) {
      font-size: 50px;
      line-height: 1.2;
    }

    @media (max-width: 1024px) {
      font-size: 45px;
      line-height: 1.2;
    }

    @media (max-width: 690px) {
      font-size: 40px;
      line-height: 1.2;
      width: 70%;
      white-space: normal;
    }

    @media (max-width: 575px) {
      font-size: 35px;
      line-height: 1.2em;
      width: 80%;
    }

    @media (max-width: 425px) {
      width: 100%;
    }
  }
  p {
    margin: 0;
    color: #fff;
    opacity: 0.8;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.88;
    letter-spacing: -0.3px;
    width: 42%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 35px;

    @media (max-width: 1024px) {
      width: 48%;
    }

    @media (max-width: 690px) {
      width: 55%;
    }

    @media (max-width: 575px) {
      width: 65%;
      line-height: 1.5;
    }

    @media (max-width: 425px) {
      width: 80%;
    }
  }
  .imageWrapper {
    display: inline-block;
    position: relative;
    bottom: -135px;
    margin-top: -115px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15);

    @media (max-width: 480px) {
      bottom: 0;
      margin-top: 40px;
    }
  }
  .reusecore__button {
    background-color: #00005c;
    padding: 17.5px 20px;
    border-radius: 5px;
    transition: 500ms;
    position: relative;
    z-index: 10;

    &:hover {
      color: #00005c;
      background-color: #fff;
    }
    span {
      font-family: DM Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      display: flex;
      align-items: center;
    }
  }
`;

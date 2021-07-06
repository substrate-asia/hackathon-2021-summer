import styled from 'styled-components';

export const TwitterWrapper = styled.section`
  position: relative;
  margin-top: -35px;
  padding-bottom: 100px;

  @media (max-width: 767px) {
    margin-top: 0;
    padding-top: 0px;
    padding-bottom: 80px;
  }
  .container {
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-left: -12.5px;
      margin-right: -12.5px;
      .column {
        flex: 1 1 33.333%;
        padding-left: 12.5px;
        padding-right: 12.5px;
        display: flex;

        @media (max-width: 991px) {
          flex: 1 1 100%;
        }

        @media (max-width: 625px) {
          flex: 1 1 100%;
        }
      }
    }
  }
  .twitterBox {
    background: #ffffff;
    border: 1px solid #eae9f2;
    border-radius: 10px;
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    padding: 35px 27px;
    padding-bottom: 29px;
    p {
      margin: 0;
    }
  }
  .twitterBoxInner {
    width: 100%;
  }
  .twitterTop {
    position: relative;
    padding-left: 56px;
    > img {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
    h3 {
      margin: 0;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 1.56;
      letter-spacing: -0.656526px;
      color: #19191b;
    }
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 1.87;
      letter-spacing: -0.500211px;
      color: #696871;
      display: flex;
    }
    > i {
      position: absolute;
      top: 50%;
      right: 0;
      color: #6937f6;
      transform: translateY(-50%);
    }
  }
  .twitterContent {
    p {
      margin: 0;
      font-style: normal;
      font-weight: normal;
      font-size: 17px;
      line-height: 1.76;
      letter-spacing: -0.3px;
      color: #19191b;
    }
  }
  .blockTitle {
    text-align: center;
    margin-bottom: 70px;
    @media (max-width: 425px) {
      margin-bottom: 50px;
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
      margin-bottom: 10px;
      @media (max-width: 375px) {
        font-size: 22px;
      }
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: #858b91;
    }
  }
  .text-center {
    text-align: center;
  }
  .viewTwitter {
    background-color: #f7f7f7;
    border-radius: 6px;
    display: inline-block;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #958fa5;
    padding: 12.5px 18.5px;
    transition: 500ms;
    &:hover {
      background-color: #6937f6;
      color: #fff;
    }
  }
`;

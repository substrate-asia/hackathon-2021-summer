import styled from 'styled-components';

export const FaqWrapper = styled.section`
  position: relative;
  padding-top: 90px;
  padding-bottom: 100px;
  @media (max-width: 767px) {
    padding-top: 70px;
    padding-bottom: 80px;
  }
  .container {
    max-width: 730px;
  }
  .blockTitle {
    text-align: center;
    margin-bottom: 63px;
    @media (max-width: 767px) {
      margin-bottom: 33px;
    }
    h2 {
      margin: 0;
      font-style: normal;
      font-weight: 500;
      font-size: 26px;
      line-height: 1;
      letter-spacing: -0.03em;
      color: #09131f;
    }
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 1;
      color: #858b91;
      margin: 0;
      margin-top: 20px;
    }
  }
  .btnWrapper {
    text-align: center;
    margin-top: 30px;

    .reusecore__button {
      background-color: #f7f7f7;
      border-radius: 6px;
      display: inline-block;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      text-align: center;
      -webkit-letter-spacing: -0.01em;
      -moz-letter-spacing: -0.01em;
      -ms-letter-spacing: -0.01em;
      letter-spacing: -0.01em;
      color: #958fa5;
      padding: 12.5px 18.5px;
      -webkit-transition: 500ms;
      transition: 500ms;
      &:hover {
        background-color: #6937f6;
        color: #fff;
      }
    }
  }
  .accordion_title h2 {
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    padding-top: 27px;
    padding-bottom: 27px;
    letter-spacing: -0.01em;
    color: #09131f;
    &::before {
      margin-right: 15px;
      content: counters(faqCounter, '.', decimal-leading-zero) '.';
    }
  }
  .openIcon {
    color: rgba(0, 0, 0, 1);
  }
  .closeIcon {
    color: rgba(0, 0, 0, 0.4);
  }
  .reusecore__accordion {
    counter-reset: faqCounter;
  }
  .accordion__item {
    counter-increment: faqCounter;
    padding-left: 30px;
    padding-right: 30px;
  }
  .accordion__item + .accordion__item {
    border-top: 1px solid #eae9f2;
  }
  .accordion__item:last-child {
    border-bottom: 1px solid #eae9f2;
  }
  .accordion_body {
    padding-right: 40px;
    padding-left: 40px;
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 2;
      color: #09131f;
    }
  }
`;

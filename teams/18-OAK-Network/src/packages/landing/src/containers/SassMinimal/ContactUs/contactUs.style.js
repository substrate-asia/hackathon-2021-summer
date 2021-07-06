import styled from 'styled-components';

export const ContactUsWrapper = styled.section`
  position: relative;
  .container {
    max-width: 1200px;
  }
  .contactInner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 52.5px;
    padding-bottom: 52.5px;

    @media (max-width: 991px) {
      flex-direction: column;
      jusitfy-content: flex-start;
      align-items: flex-start;
    }

    @media (max-width: 480px) {
      padding: 40px;
    }
    @media (max-width: 375px) {
      padding: 20px;
    }

    &:before {
      content: '';
      background: linear-gradient(
        166.81deg,
        #3a1c71 -117.61%,
        #d76d77 -16.82%,
        #ffaf7b 97.4%
      );
      opacity: 0.3;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    h3 {
      margin: 0;
      position: relative;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 1.41;
      letter-spacing: -1px;
      color: #c36276;
      @media (max-width: 1440px) {
        font-size: 28px;
      }
      &.color2 {
        color: #81152b;
        margin-top: 5px;
      }

      @media (max-width: 575px) {
        font-size: 28px;
      }
      @media (max-width: 375px) {
        font-size: 22px;
      }
    }
  }
  .contactBtn {
    display: inline-block;
    position: relative;
    background: linear-gradient(
      153.76deg,
      #3a1c71 -167.27%,
      #d76d77 -11.03%,
      #ffaf7b 166.05%
    );
    border-radius: 5px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    padding: 22px 46px;
    @media (max-width: 1440px) {
      font-size: 16px;
      padding: 17px 37px;
    }
    @media (max-width: 991px) {
      margin-top: 20px;
    }
  }
`;

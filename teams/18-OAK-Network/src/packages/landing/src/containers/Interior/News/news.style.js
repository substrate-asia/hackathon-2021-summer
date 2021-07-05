import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  background-color: #fbfafe;
  padding-bottom: 20px;
  margin-top: 40px;
  position: relative;
  @media only screen and (max-width: 1440px) {
    margin-top: -20px;
  }
  @media only screen and (max-width: 1360px) {
    margin-top: -60px;
  }
  @media only screen and (max-width: 767px) {
    margin-top: 22px;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 10vw;
    background-color: ${themeGet('colors.white', '#ffffff')};
    position: absolute;
    top: 0;
    left: 0;
    @media only screen and (max-width: 1440px) {
      height: 14vw;
    }
    @media only screen and (max-width: 1360px) {
      height: 15vw;
    }
    @media only screen and (max-width: 1200px) {
      height: 17vw;
    }
    @media only screen and (max-width: 767px) {
      height: 13vw;
    }
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1576px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  @media only screen and (max-width: 1600px) {
    padding: 0 60px;
  }
  @media only screen and (max-width: 1440px) {
    padding: 0 50px;
    margin-bottom: -30px;
  }
  @media only screen and (max-width: 1200px) {
    padding: 0 30px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin: 0 -30px;
    @media only screen and (max-width: 667px) {
      padding: 0 30px;
    }

    .col {
      width: calc(100% / 4);
      padding: 0 50px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25vw;
      color: #f5f5fc;
      font-weight: 500;
      @media only screen and (min-width: 768px) and (max-width: 1200px) {
        font-size: 22vw;
      }
      @media only screen and (max-width: 767px) {
        height: auto;
        padding: 0;
      }
      &:last-child {
        color: #fffbc0;
      }
    }
  }
`;

export const NewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -30px;
  position: relative;
  top: -7vw;
  z-index: 1;
  @media only screen and (max-width: 1440px) {
    top: -8vw;
  }
  @media only screen and (max-width: 1360px) {
    top: -12vw;
  }
  @media only screen and (min-width: 992px) and (max-width: 1200px) {
    margin: 0 -15px;
    top: -14vw;
  }
  @media only screen and (max-width: 767px) {
    top: -15vw;
    padding-bottom: 50px;
  }
`;

export const NewsItem = styled.div`
  width: calc(100% / 4);
  padding: 0 50px;
  @media only screen and (max-width: 1440px) {
    padding: 0 30px;
  }
  @media only screen and (min-width: 992px) and (max-width: 1200px) {
    padding: 0 15px;
  }
  @media only screen and (max-width: 991px) {
    width: calc(100% / 2);
    margin-top: 50px;
  }
  @media only screen and (max-width: 480px) {
    width: calc(100% / 1);
  }

  h3 {
    font-weight: 400;
    margin: 0 0 22px;
    @media only screen and (min-width: 992px) and (max-width: 1200px) {
      font-size: 18px;
      line-height: 28px;
      margin: 0 0 15px;
    }
  }

  p {
    margin: 0 0 40px;
  }
`;

export default SectionWrapper;

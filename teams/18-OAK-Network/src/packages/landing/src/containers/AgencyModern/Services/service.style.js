import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 100px 0 60px;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0 0px;
  }

  @media only screen and (max-width: 768px) {
    padding: 70px 0 40px;
  }
`;

export const SectionHeader = styled.header`
  text-align: center;
  margin-bottom: 60px;
  @media only screen and (max-width: 1440px) {
    margin-bottom: 50px;
  }
  @media only screen and (max-width: 991px) {
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 480px) {
    margin-bottom: 25px;
  }

  h2 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.9;
    margin-bottom: 7px;

    @media only screen and (max-width: 991px) {
      font-size: 30px;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 28px;
    }
    @media screen and (max-width: 480px) {
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 20px;
    }
  }

  p {
    font-family: 'DM Sans';
    font-weight: 400;
    font-size: 15px;
    line-height: 2;
    margin-bottom: 0;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
      line-height: 1.6;
    }
    @media only screen and (max-width: 991px) {
      font-size: 15px;
      line-height: 28px;
    }
  }
`;

export const ServiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-wrap: nowrap;
  }
  @media only screen and (max-width: 480px) {
    flex-wrap: wrap;
  }

  .react-reveal {
    width: calc(33.3333% - 30px);
    margin: 38px 0 0;
    @media only screen and (max-width: 991px) {
      width: calc(50% - 30px);
    }
    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .service__item {
    display: flex;
    align-items: flex-start;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    @media only screen and (max-width: 480px) {
      align-items: center;
    }

    .service__image {
      margin-right: 29px;
      flex-shrink: 0;
      @media only screen and (max-width: 1360px) {
        margin-right: 20px;
      }
      @media only screen and (max-width: 768px) {
        margin-bottom: 15px;
        margin-right: 0px;
      }
    }

    h4 {
      margin: 0 0 14px;
      font-family: 'DM Sans';
      font-weight: 700;
      font-size: 18px;
      line-height: 30px;
      @media only screen and (max-width: 1440px) {
        margin: 0 0 5px;
      }
      @media only screen and (max-width: 1360px) {
        font-size: 18px;
      }
      @media only screen and (max-width: 768px) {
        text-align: center;
      }
      @media only screen and (max-width: 480px) {
        text-align: center;
      }
    }

    p {
      margin: 0;
      font-family: 'DM Sans';
      font-size: 15px;
      line-height: 30px;
      color: ${themeGet('colors.text', '#294859')};
      @media only screen and (max-width: 1440px) {
        font-size: 16px;
      }
      @media only screen and (max-width: 1360px) {
        font-size: 15px;
        line-height: 26px;
      }
      @media only screen and (max-width: 768px) {
        text-align: center;
      }
      @media only screen and (max-width: 480px) {
        text-align: center;
      }
    }
  }
`;

export default SectionWrapper;

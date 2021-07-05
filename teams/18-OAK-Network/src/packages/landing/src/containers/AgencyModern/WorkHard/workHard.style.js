import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 30px 0 130px;
  @media only screen and (max-width: 1440px) {
    padding: 0px 0 100px;
  }
  @media only screen and (max-width: 1024px) {
    padding: 50px 0 100px;
  }
  @media only screen and (max-width: 768px) {
    padding: 20px 0 65px;
  }
  @media only screen and (max-width: 480px) {
    padding: 0px 0 70px;
  }
`;

export const Section = styled.section`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Content = styled.div`
  width: 40%;
  @media only screen and (min-width: 1024px) and (max-width: 1366px) {
    width: 43%;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    margin-top: 30px;
  }

  h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 1.52;
    letter-spacing: -1px;
    @media only screen and (max-width: 1440px) {
      font-size: 30px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 24px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 24px;
      text-align: center;
      margin-top: 15px;
    }
  }
  p {
    font-size: 15px;
    line-height: 42px;
    @media only screen and (min-width: 1024px) and (max-width: 1366px) {
      line-height: 32px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      line-height: 28px;
    }
    @media only screen and (max-width: 768px) {
      line-height: 32px;
      text-align: center;
    }
  }
  .explore {
    color: ${themeGet('colors.linkColor')};
    font-weight: 700;
    font-size: 15px;
    line-height: 42px;
    margin-top: 30px;
    display: inline-flex;
    align-items: center;
    @media only screen and (max-width: 768px) {
      justify-content: center;
      margin-left: -50px;
      width: 100%;
    }

    i {
      line-height: 1;
      margin-left: 2px;
      transition: 0.3s ease 0s;
    }
    &:hover i {
      margin-left: 7px;
    }
    @media only screen and (min-width: 1024px) and (max-width: 1366px) {
      margin-top: 15px;
    }
    @media only screen and (max-width: 768px) {
      margin-top: 15px;
    }
    @media only screen and (max-width: 480px) {
      margin-top: 25px;
    }
  }
`;

export const Illustration = styled.figure`
  width: 55%;
  margin: 0 0 0 5%;
  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
    width: 100%;
    margin: 0;
  }
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

export const ListGroup = styled.div`
  column-count: 2;
  margin-top: 30px;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 25px;
  }
  @media only screen and (max-width: 768px) {
    margin: 0 auto;
    max-width: 70%;
    margin-top: 40px;
    padding-top: 0;
    padding-bottom: 0;
  }

  @media only screen and (max-width: 411px) {
    column-count: 1;
  }
  .list-item {
    display: flex;
    align-items: center;

    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 12px;
    }
    img {
      margin-right: 10px;
    }
    &:not(:last-child) {
      margin-bottom: 22px;
    }
  }
`;

export default SectionWrapper;

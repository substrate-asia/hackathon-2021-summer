import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 120px 0 70px;
  @media screen and (max-width: 1440px) {
    padding: 70px 0px;
  }
  @media screen and (max-width: 768px) {
    padding: 50px 0;
  }
  @media screen and (max-width: 480px) {
    padding: 60px 0 10px;
  }
`;

export const Section = styled.div`
  display: flex;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Illustration = styled.figure`
  width: 55%;
  margin: 0 5% 0 0;
  @media only screen and (max-width: 768px) {
    margin-bottom: 30px;
    width: 100%;
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
  @media only screen and (max-width: 480px) {
    margin-top: 0;
  }
  h2 {
    font-family: Arvo;
    font-weight: 700;
    font-size: 32px;
    line-height: 60px;
    @media only screen and (min-width: 1024px) and (max-width: 1366px) {
      font-size: 30px;
      line-height: 50px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 22px;
      line-height: 40px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 42px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 20px;
      line-height: 36px;
      font-weight: 700;
    }
  }
  p {
    font-size: 16px;
    line-height: 42px;
    @media only screen and (min-width: 1024px) and (max-width: 1366px) {
      line-height: 32px;
    }
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      line-height: 28px;
    }
    @media only screen and (max-width: 768px) {
      line-height: 32px;
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
  }
`;

export const ListGroup = styled.div`
  column-count: 2;
  margin-top: 30px;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 25px;
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
    &:not(:last-child) {
      margin-bottom: 22px;
    }
    i {
      margin-right: 8px;
    }
  }
`;

export default SectionWrapper;

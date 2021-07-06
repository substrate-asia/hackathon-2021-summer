import { rgba } from 'polished';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  background-color: #1a0047;
  padding: 80px 0 30px;
  position: relative;
  z-index: 0;
  &::after {
    background-color: #f6f9fb;
    content: '';
    height: 220px;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: -1;
    @media only screen and (max-width: 768px) {
      height: 140px;
    }
    @media only screen and (max-width: 480px) {
      height: 80px;
    }
  }
`;

export const SectionHeading = styled.div`
  max-width: 700px;
  margin: 0 auto 90px;
  text-align: center;
  @media only screen and (max-width: 480px) {
    margin-bottom: 60px;
  }
  h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 1.33;
    letter-spacing: -0.04em;
    color: ${themeGet('colors.white')};
    @media only screen and (max-width: 1200px) {
      font-size: 30px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
      line-height: 1.5;
    }
  }
`;

export const TabPanel = styled.div`
  max-width: 786px;
  margin: 0 auto 80px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const TabPane = styled.div`
  position: relative;
  z-index: 1;
  figure {
    background-color: #311959;
    border-radius: 32px;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 480px) {
      border-radius: 20px;
      height: 65px;
      width: 65px;
    }
    img {
      @media only screen and (max-width: 480px) {
        width: 30px;
      }
    }
  }
  p {
    font-weight: 500;
    font-size: 17px;
    line-height: 1.3;
    text-align: center;
    color: ${themeGet('colors.white')};
    margin-top: 20px;
    @media only screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

export const ProcessLine = styled.span`
  border: 2px dashed ${rgba('#fff', 0.2)};
  position: absolute;
  left: 120px;
  top: 49px;
  right: 120px;
  @media only screen and (max-width: 480px) {
    left: 51px;
    top: 35px;
    right: 48px;
  }
`;

export const LoadingLine = styled.span`
  background-color: #5c97f2;
  position: absolute;
  left: 120px;
  height: 4px;
  width: 110px;
  top: 49px;
  border-radius: 20px;
  @media only screen and (max-width: 480px) {
    left: 50px;
    height: 4px;
    width: 50px;
    top: 35px;
  }
`;

export const Illustration = styled.figure``;

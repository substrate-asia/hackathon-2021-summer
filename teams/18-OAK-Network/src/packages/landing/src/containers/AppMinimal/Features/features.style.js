import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const SectionWrapper = styled.section`
  padding: 100px 0;
  overflow: hidden;
  background-color: ${themeGet('colors.secondary', '#19202C')};
  header.text-white {
    h2 {
      color: ${themeGet('colors.white', '#FFFFFF')};
    }
    p {
      color: ${themeGet('colors.white', '#FFFFFF')};
      opacity: 0.9;
    }
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    width: calc(100% / 3);
    padding: 60px 55px;
    border-top: 1px solid ${rgba('#FFFFFF', 0.1)};
    border-right: 1px solid ${rgba('#FFFFFF', 0.1)};
    transition: all 0.3s;
    &:nth-of-type(3n) {
      border-right: 0;
    }
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3) {
      border-top: 0;
    }
    &:hover {
      background-color: ${rgba('#FFFFFF', 0.05)};
    }
    @media (max-width: 1600px) {
      padding: 40px 45px;
    }
    @media (max-width: 768px) {
      width: calc(100% / 2);
    }

    &:nth-of-type(2n) {
      @media (max-width: 768px) {
        border-right: 0;
      }
    }

    &:nth-of-type(3n) {
      @media (max-width: 768px) {
        border-right: 1px solid ${rgba('#FFFFFF', 0.1)};
        border-top: 1px solid ${rgba('#FFFFFF', 0.1)};
      }
    }
    &:last-of-type {
      @media (max-width: 768px) {
        border-right: 0px solid ${rgba('#FFFFFF', 0.1)};
      }
    }

    @media (max-width: 575px) {
      width: calc(100% / 1);
      border-right: 0 !important;
      border-top: 1px solid ${rgba('#FFFFFF', 0.1)} !important;
      &:first-of-type {
        border-top: 0 !important;
      }
    }
  }

  .feature__block {
    text-align: center;
    .icon__wrapper {
      max-width: 115px;
      margin: 0 auto 25px;
      position: relative;
      @media only screen and (max-width: 1366px) {
        margin-bottom: 25px;
      }
      img {
        display: inline-block;
        @media only screen and (max-width: 1366px) {
          height: 90px;
        }
        @media only screen and (max-width: 767px) {
          height: 80px;
        }
      }
    }
    .content__wrapper {
      margin: 0 auto;
      h3 {
        color: ${themeGet('colors.white', '#FFFFFF')};
        font-size: 18px;
        line-height: 1.45;
        font-weight: 700;
        margin-bottom: 10px;
        @media (max-width: 1600px) {
          font-size: 16px;
        }
      }
      p {
        color: ${themeGet('colors.white', '#FFFFFF')};
        font-size: 16px;
        line-height: 1.9;
        padding: 0 15px;
        opacity: 0.7;
        @media (max-width: 1600px) {
          font-size: 15px;
        }
      }
    }
  }
`;

export default SectionWrapper;

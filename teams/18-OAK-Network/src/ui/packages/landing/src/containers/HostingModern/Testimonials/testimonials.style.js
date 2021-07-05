import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const SectionWrapper = styled.section`
  position: relative;
  &::before {
    background-color: #f0f3f8;
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: calc(100% - 30px);
  }
  @media only screen and (max-width: 768px) {
    padding: 50px 0;
    &::before {
      height: 100%;
    }
  }
`;

export const Content = styled.div`
  .swiper-pagination {
    bottom: 50px;
    left: -48px;
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      left: -18px;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      bottom: 40px;
      left: -46px;
    }
    @media only screen and (max-width: 768px) {
      bottom: 0;
      left: auto;
      position: static;
      margin-top: 20px;
    }
    @media only screen and (max-width: 767px) {
      bottom: 0;
      left: 0;
    }
  }
  .swiper-custom-pagination {
    background-color: ${rgba('#5B2B9D', 0.6)};
    border: 0;
    border-radius: 10px;
    padding: 0;
    height: 6px;
    width: 15px;
    transition: 0.3s ease 0s;
  }
  .swiper-pagination-bullet-active {
    background-color: ${themeGet('colors.tertiary')};
    width: 30px;
  }
`;

export const Testimonial = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 767px) {
    margin-bottom: 40px;
  }
`;

export const Figure = styled.figure`
  margin: 0 80px 0 0;
  width: 35%;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const Caption = styled.div`
  background-color: #f0f3f8;
  width: 50%;
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    /* margin-left: 5%; */
    width: 65%;
  }
  @media only screen and (max-width: 768px) {
    margin-left: 5%;
    width: 61%;
  }
  @media only screen and (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
  h2 {
    font-size: 36px;
    font-weight: 400;
    line-height: 55px;
    letter-spacing: -1px;
    @media only screen and (max-width: 1366px) and (max-height: 768px) {
      font-size: 32px;
      line-height: 50px;
    }
    /* Portrait */
    @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
      font-size: 28px;
      line-height: 48px;
      letter-spacing: 0;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      font-size: 28px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 24px;
      line-height: 40px;
      text-align: center;
    }
  }
  p {
    margin: 30px 0 0;
    @media only screen and (max-width: 768px) {
      text-align: center;
    }
  }
`;

export default SectionWrapper;

import { rgba } from 'polished';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Section = styled.section`
  background: linear-gradient(
    185.02deg,
    #f6f9fb 53.39%,
    rgba(246, 249, 251, 0) 93.75%
  );
  padding: 70px 0;
  @media only screen and (max-width: 768px) {
    padding: 50px 0 60px;
  }
`;

export const SectionHeading = styled.div`
  max-width: 585px;
  margin: 0 auto 80px;
  text-align: center;
  h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 1.33;
    letter-spacing: -0.04em;
    color: ${themeGet('colors.textPrimary')};
    margin-bottom: 20px;
    @media only screen and (max-width: 1200px) {
      font-size: 30px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 24px;
    }
  }
  p {
    color: ${rgba('#0f2137', 0.7)};
    line-height: 2;
    margin: 0 auto;
    max-width: 490px;
  }
`;

export const ContentWrapper = styled.div`
  .swiper-pagination {
    position: static;
    margin-top: 30px;
  }
  .swiper-pagination-bullet {
    background-color: ${rgba('#6720DF', 0.2)};
    border-radius: 10px;
    height: 8px;
    opacity: 1;
    width: 13px;
    transition: 0.3s ease-in-out 0s;
  }
  .swiper-pagination-bullet-active {
    background-color: ${themeGet('colors.primary')};
    width: 20px;
  }
`;

export const Item = styled.div`
  background: #ffffff;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 11px 40px 43px;
  @media only screen and (max-width: 768px) {
    padding: 11px 30px 35px;
  }
  .author-info {
    display: flex;
    margin-bottom: 25px;
    h4 {
      margin: 0;
    }
    p {
      margin: 0;
    }
  }
  .info {
    margin-left: 20px;
    margin-top: 18px;
  }
  blockquote {
    font-style: italic;
    font-size: 18px;
    line-height: 1.68;
    color: ${rgba('#19191b', 0.7)};
    margin: 0;
    @media only screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

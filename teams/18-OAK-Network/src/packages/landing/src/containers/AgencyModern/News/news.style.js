import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 30px 0 150px;
  @media screen and (max-width: 1440px) {
    padding: 30px 0 90px;
  }
  @media screen and (max-width: 768px) {
    padding: 30px 0 60px;
  }
`;

export const SectionHeading = styled.div`
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  h2 {
    font-weight: 700;
    font-size: 26px;
    line-height: 1.9;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
    @media screen and (max-width: 1440px) {
      line-height: 1.5;
    }
    @media screen and (max-width: 480px) {
    }
  }
  p {
    font-size: 15px;
    line-height: 35px;
    color: ${themeGet('colors.headingColor')};
    @media screen and (max-width: 1440px) {
      line-height: 30px;
    }
  }
`;

export const NewsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .blog_post {
    width: calc((100% / 3) - 15px);
    margin: 50px 0 0 0;
    @media screen and (max-width: 991px) {
      width: calc((100% / 2) - 15px);
    }
    @media screen and (max-width: 570px) {
      width: 100%;
    }
    h3 {
      font-size: 20px;
      line-height: 30px;
      margin-top: 16px;
    }
    .learn_more {
      display: flex;
      margin: 0;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 26px;
      color: ${rgba('#343D48', 0.8)};
      img {
        margin-right: 8px;
      }
    }
  }
  .thumbnail {
    display: flex;
    img {
      max-width: 100%;
    }
  }
`;

export default SectionWrapper;

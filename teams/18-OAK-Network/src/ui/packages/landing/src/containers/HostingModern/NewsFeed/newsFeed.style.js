import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 100px 0 70px;
  @media only screen and (max-width: 1440px) {
    padding: 70px 0 30px;
  }
  @media only screen and (max-width: 7680px) {
    padding: 50px 0 20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .blog_post {
    flex: 0 0 calc(33.3333% - 20px);
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    @media only screen and (max-width: 767px) {
      flex: 0 0 100%;
      margin-right: 0;
      margin-top: 40px;
    }
    img {
      max-width: 100%;
      border-radius: 10px;
    }
    p {
      font-size: 15px;
      line-height: 32px;
      color: ${themeGet('colors.text')};
    }
    .excerptLink {
      color: #3183ff;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      i {
        margin-left: 2px;
        transition: 0.3s ease 0s;
      }
      &:hover i {
        margin-left: 5px;
      }
    }
  }
`;

export default SectionWrapper;

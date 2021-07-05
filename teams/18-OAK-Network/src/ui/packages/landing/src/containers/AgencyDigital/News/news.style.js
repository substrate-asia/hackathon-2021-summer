import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const Section = styled.div`
  padding: 70px 0;
  @media screen and (max-width: 1440px) {
    padding: 30px 0 30px;
  }
  @media screen and (max-width: 480px) {
    padding: 20px 0;
  }
`;

export const ContentWrapper = styled.div`
  .masonryGrid {
    margin-left: -15px;
    margin-right: -15px;
  }
`;

export const BlogPost = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;
  width: calc(33.3333% - 0px);
  @media screen and (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  figure {
    margin: 0;
    img {
      border-radius: 5px;
      width: 100%;
    }
  }
  h4 {
    font-family: Arvo;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    color: #0f2137;
    margin-bottom: 0;
    margin-top: 15px;
  }
  .learnMore {
    font-weight: 500;
    font-size: 15px;
    margin-top: 15px;
    display: inline-flex;
    align-items: center;
    color: ${themeGet('colors.linkColor')};
    i {
      line-height: 1;
      margin-left: 2px;
      transition: 0.3s ease 0s;
    }
    &:hover i {
      margin-left: 7px;
    }
  }
`;

export default Section;

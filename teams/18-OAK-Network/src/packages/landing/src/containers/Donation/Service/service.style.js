import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const Section = styled.section`
  padding-top: 35px;
  padding-bottom: 70px;
  @media only screen and (max-width: 1024px) {
    padding-top: 70px;
    padding-bottom: 50px;
  }
`;

export const ServiceWrapper = styled.div`
  gap: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .serviceItem {
    border-radius: 10px;
    padding: 60px 45px 60px 50px;
    box-shadow: 0px 20px 50px rgba(59, 90, 136, 0.05);
    @media only screen and (max-width: 1024px) {
      padding: 50px 29px 45px 29px;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
    }
    .thumbnail {
      margin-bottom: 25px;
    }
    .title {
      font-weight: bold;
      font-size: 18px;
      line-height: 30px;
      color: #0f2137;
    }
    .excerpt {
      font-size: 16px;
      line-height: 30px;
      color: #343d48;
    }
    .learn_more a {
      font-weight: 500;
      font-size: 15px;
      line-height: 42px;
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
  }
`;

export default Section;

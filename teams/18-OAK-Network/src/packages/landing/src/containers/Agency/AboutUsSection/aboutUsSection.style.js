import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const AboutUsSectionWrapper = styled.section`
  padding: 80px 0 50px;
  overflow: hidden;

  @media (max-width: 990px) {
    padding: 60px 0 40px 0;
  }
  .col {
    align-self: center;
  }

  .group-gallery {
    box-shadow: none;
    display: flex;
    flex-wrap: wrap;
    .col1 {
      width: calc(60% - 30px);
      margin-right: 30px;
    }
    .col2 {
      width: calc(40% - 30px);
      align-self: center;
      margin-right: 30px;
    }
    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 30px;
      object-fit: contain;
      box-shadow: 0px 0px 250px 0px rgba(39, 79, 117, 0.1);
    }
  }

  .feature__block {
    align-items: center;
    margin-bottom: 14px;
    .icon__wrapper {
      color: ${themeGet('colors.primary', '#10ac84')};
      margin-right: 10px;
    }
    .content__wrapper {
      h2 {
        margin-bottom: 0;
      }
    }
  }

  .reusecore__button {
    margin-top: 36px;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
    }
  }
`;

export default AboutUsSectionWrapper;

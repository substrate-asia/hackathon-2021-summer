import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
const FaqSectionWrapper = styled.section`
  padding: 80px 0;
  overflow: hidden;
  @media (max-width: 990px) {
    padding: 40px 0 60px 0;
  }
  @media (max-width: 767px) {
    padding: 20px 0 40px 0;
  }

  .reusecore__accordion {
    max-width: 820px;
    margin: 0 auto;
    border: 1px solid ${themeGet('colors.inactiveIcon', '#ebebeb')};
    border-radius: 5px;
    box-shadow: 0px 0px 30px 0px rgba(25, 61, 101, 0.05);

    .accordion__item {
      border-top: 0;
      border-bottom: 1px solid ${themeGet('colors.inactiveIcon', '#ebebeb')};
      &:last-child {
        border-bottom: 0;
      }

      .accordion__header {
        padding: 20px 30px;
      }

      .accordion__body {
        padding: 5px 30px 20px;
      }
    }
  }
`;

export default FaqSectionWrapper;

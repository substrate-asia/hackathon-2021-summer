import styled from 'styled-components';

const FaqSectionWrapper = styled.section`
  padding: 80px 0;
  background: #fafbff;

  .reusecore__accordion {
    max-width: 820px;
    margin: 0 auto;
    border-bottom: 1px solid #ebebeb;

    .accordion__item {
      border-top: 0;
      border-bottom: 1px solid #ebebeb;
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

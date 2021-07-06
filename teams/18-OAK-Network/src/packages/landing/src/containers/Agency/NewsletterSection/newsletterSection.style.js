import styled from 'styled-components';

const NewsletterSectionWrapper = styled.section`
  overflow: hidden;
  width: 100%;
  margin-top: 50px;
  @media (max-width: 990px) {
  }
`;

const NewsletterForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 575px) {
    flex-direction: column;
    max-width: 100%;
  }

  .reusecore__input {
    flex: 1;
    max-width: 488px;
    margin-right: 20px;
    @media (max-width: 575px) {
      margin: 0 0 20px 0;
      width: 100%;
    }
    .field-wrapper {
      input {
        min-height: 45px;
      }
    }
    &.is-material {
      label {
        font-size: 14px;
        top: 14px;
        font-weight: 500;
        color: rgba(51, 61, 72, 0.4);
      }
      &.is-focus {
        label {
          top: -12px;
        }
      }
    }
  }

  .reusecore__button {
    flex-shrink: 0;
    transition: all 0.3s ease;
    @media (max-width: 575px) {
      width: 100%;
    }
    &:hover {
      box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
    }
  }
`;

export { NewsletterForm };

export default NewsletterSectionWrapper;

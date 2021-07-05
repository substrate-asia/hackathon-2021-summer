import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import error from 'common/assets/image/error.svg';
import success from 'common/assets/image/success.svg';

const SectionWrapper = styled.section`
  padding: 51px 0 130px;
  background-color: ${themeGet('colors.lightBg', '#fbfafe')};
  @media only screen and (max-width: 1440px) {
    padding: 20px 0 100px;
  }

  @media only screen and (max-width: 767px) {
    padding: 42px 0;
    flex-wrap: wrap;
    padding: 60px 0;
  }

  @media only screen and (max-width: 480px) {
    header {
      padding: 0 30px 40px;
    }
  }
`;

export const FormWrapper = styled.form`
  max-width: 760px;
  padding: 0 30px;
  margin: 0 auto;

  p {
    text-align: center;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 64px;
  @media only screen and (max-width: 667px) {
    margin-bottom: 40px;
    flex-direction: column;
  }

  p {
    margin-bottom: 0;
  }

  .input_element {
    width: calc(100% - 132px);
    display: flex;
    align-items: center;
    position: relative;
    padding-right: 20px;
    @media only screen and (max-width: 667px) {
      width: 100%;
      padding-right: 0;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      font-size: 16px;
      padding: 20px 25px 20px 65px;
      border-radius: 5px;
      border: 1px solid #f4f4fd;
      color: ${themeGet('colors.heading', '#191919')};
      background-color: ${themeGet('colors.white', '#ffffff')};
      transition: all 0.3s ease;
      @media only screen and (max-width: 767px) {
        padding: 18px 25px 18px 60px;
      }

      &::placeholder {
        color: ${themeGet('colors.lightText', '#7E7E7E')};
      }

      &:focus {
        border-color: ${themeGet('colors.inactiveIcon', '#EBEBEB')};
      }
    }

    .input-icon {
      position: absolute;
      left: 22px;

      i {
        color: ${themeGet('colors.lightText', '#7E7E7E')};
        svg {
          width: auto;
          height: 24px;
        }
      }
    }

    &::after {
      content: '';
      width: 16px;
      height: 16px;
      position: absolute;
      top: calc(50% - 16px / 2);
      right: 45px;
      flex-shrink: 0;
      @media only screen and (max-width: 767px) {
        right: 24px;
      }
    }

    &.invalid {
      &::after {
        background-image: url(${error});
      }
    }

    &.valid {
      &::after {
        background-image: url(${success});
      }
    }
  }

  button.reusecore__button {
    width: 132px;
    height: 60px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    @media only screen and (max-width: 667px) {
      width: 100%;
      height: 56px;
    }
  }
`;

export default SectionWrapper;

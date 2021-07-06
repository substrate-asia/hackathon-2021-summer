import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 75px 0;
  @media only screen and (max-width: 1366px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 45px 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  max-width: 320px;
  padding: 6px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: ${themeGet('colors.inactiveField', '#f7f8fb')};

  button {
    border: 0;
    padding: 15px 26px;
    border-radius: 5px;
    color: rgba(15, 33, 55, 0.5);
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
    background-color: transparent;
    cursor: pointer;
    width: 100%;
    @media only screen and (max-width: 480px) {
      font-size: 15px;
    }

    &.active {
      color: ${themeGet('colors.headingColor', '#0f2137')};
      background-color: ${themeGet('colors.white', '#ffffff')};
      box-shadow: 0 3px 4px
        ${themeGet('colors.shadow', 'rgba(38, 78, 118, 0.1)')};
    }
  }
`;

export const PricingArea = styled.div`
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 667px) {
    overflow: hidden;
    margin-bottom: -40px;
    width: calc(100% + 60px);
    margin-left: -30px;
  }
  @media only screen and (max-width: 480px) {
    width: calc(100% + 40px);
    margin-left: -20px;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 51px;
  @media only screen and (max-width: 667px) {
    padding-top: 50px;
    padding-bottom: 80px;
    margin-bottom: -40px;
    overflow-x: scroll;
    overflow-y: hidden;
  }
`;

export const PricingCard = styled.div`
  width: calc(100% / 2 - 25px);
  max-width: 340px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 6px 50px ${themeGet('colors.shadow', 'rgba(38, 78, 118, 0.1)')};
  position: relative;
  @media only screen and (max-width: 1366px) {
    width: calc(100% / 2 - 20px);
  }
  @media only screen and (max-width: 991px) {
    width: calc(100% / 2 - 15px);
  }
  @media only screen and (max-width: 667px) {
    width: calc(80% - 30px);
    flex-shrink: 0;
    margin-right: 30px;
  }
  @media only screen and (max-width: 480px) {
    width: calc(96% - 25px);
    margin-right: 20px;
  }
  @media only screen and (max-width: 320px) {
    width: 100%;
    margin-right: 0;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 109px;
    height: 30px;
    position: absolute;
    top: -10px;
    left: 37px;
    border-radius: 5px;
    color: ${themeGet('colors.white', '#ffffff')};
    font-size: 14px;
    font-weight: 700;
    text-transform: capitalize;
    background-color: ${themeGet('colors.yellow', '#FFA740')};
    img {
      margin-right: 6px;
    }
  }

  .card-header {
    padding: 17px 20px;
    margin-bottom: 20px;
    @media only screen and (max-width: 480px) {
      padding: 15px 10px 10px;
    }
    h3 {
      color: ${themeGet('colors.headingColor', '#0F2137')};
      font-size: 22px;
      line-height: 26px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    p {
      color: ${themeGet('colors.textColor', 'rgba(52, 61, 72, 0.8)')};
      font-size: 15px;
      margin: 0;
    }
  }

  .card-body {
    padding: 0 20px;
    margin-bottom: 25px;
    @media only screen and (max-width: 480px) {
      padding: 0 10px;
      margin-bottom: 30px;
    }
    ul {
      li {
        color: ${themeGet('colors.quoteText', '#343D48')};
        font-size: 16px;
        margin-bottom: 21px;
        i {
          color: ${themeGet('colors.primary', '#2563FF')};
          margin-right: 8px;
          svg {
            width: 20px;
            height: auto;
          }
        }
      }
    }
  }

  .card-footer {
    padding: 17px 30px;
    border-top: 1px solid #f3f4f5;
    text-align: center;
    @media only screen and (max-width: 480px) {
      padding: 30px 10px 20px;
    }
    strong {
      display: block;
      color: ${themeGet('colors.textColor', 'rgba(52, 61, 72, 0.8)')};
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 27px;
      span {
        font-weight: 700;
        font-size: 36px;
        color: ${themeGet('colors.headingColor', '#0F2137')};
      }
    }
    .reusecore__button {
      border-radius: 5px;
      @media only screen and (max-width: 767px) {
        width: 100%;
      }
    }
    .trail {
      margin-top: 22px;
      a {
        color: rgba(37, 99, 255, 0.9);
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
`;

export default SectionWrapper;

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 75px 0;
  overflow: hidden;
  @media only screen and (max-width: 1366px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 667px) {
    padding: 45px 0;
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 906px;
  width: 100%;
  margin: 0 auto -30px;
  @media only screen and (max-width: 1366px) {
    max-width: 100%;
  }
  @media only screen and (max-width: 480px) {
    margin: 0;
  }

  > div {
    width: calc(100% / 3 - 27px);
    margin: 15px 0 30px;
    @media only screen and (max-width: 991px) {
      width: calc(100% / 3 - 15px);
    }
    @media only screen and (max-width: 667px) {
      width: calc(100% - 27px);
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .feature__block {
    text-align: center;
    .icon__wrapper {
      max-width: 115px;
      margin: 0 auto 27px;
      position: relative;
      @media only screen and (max-width: 1366px) {
        margin-bottom: 25px;
      }
      img {
        display: inline-block;
        @media only screen and (max-width: 1366px) {
          height: 90px;
        }
        @media only screen and (max-width: 767px) {
          height: 80px;
        }
      }
      i {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        color: var(--color);
        transition: all 0.5s cubic-bezier(0.75, -0.5, 0, 1.75);
        &.plus {
          top: 0;
          left: 0;
          transform: translate(20px, 20px) scale(0.1) rotate(-180deg);
        }
        &.circle {
          top: 0;
          right: 0;
          transform: translate(-20px, 20px) scale(0.1) rotate(-180deg);
        }
        &.star {
          bottom: -5px;
          left: calc(50% - 8px);
          transform: translate(0, -20px) scale(0.1) rotate(-180deg);
        }
      }
    }
    .content__wrapper {
      max-width: 375px;
      margin: 0 auto;
      h3 {
        color: var(--color);
        font-size: 17px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 15px;
      }
      p {
        color: ${themeGet('colors.textColor')};
        font-size: 15px;
        line-height: 26px;
        padding: 0 10px;
        margin: 0;
      }
    }
    &:hover {
      .icon__wrapper {
        i {
          opacity: 1;
          visibility: visible;
          &.plus {
            transform: translate(-4px, -4px) scale(1) rotate(180deg);
          }
          &.circle {
            transform: translate(4px, -4px) scale(1) rotate(180deg);
          }
          &.star {
            transform: translate(0, 13px) scale(1) rotate(180deg);
          }
        }
      }
    }
  }
`;

export default SectionWrapper;

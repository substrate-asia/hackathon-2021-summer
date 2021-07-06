import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const FeatureSectionWrapper = styled.section`
  padding: 80px 0;
  overflow: hidden;
  @media (max-width: 990px) {
    padding: 60px 0 30px 0;
  }
  @media (max-width: 767px) {
    padding: 40px 0 30px 0;
  }
  .feature__block {
    position: relative;
    height: 100%;
    transition: box-shadow 0.3s ease;
    .icon__wrapper {
      position: relative;
      background: linear-gradient(
        -60deg,
        rgba(241, 39, 17, 0.7),
        rgba(245, 175, 25, 0.7)
      );
      .flaticon-flask {
        &:before {
          margin-left: 8px;
        }
      }
      &:before,
      &:after {
        content: '';
        width: 28px;
        height: 100%;
        position: absolute;
      }
      &:before {
        transform: rotate(45deg);
        background-color: rgba(255, 255, 255, 0.15);
      }
      &:after {
        transform: rotate(-45deg);
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
    &:hover {
      box-shadow: 0 40px 90px -30px rgba(39, 79, 117, 0.2);
    }
  }
  .row {
    > .col {
      &:nth-child(-n + 3) {
        border-top: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
      }
      &:nth-child(3n + 3),
      &:last-child {
        border-right: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
      }
      @media only screen and (max-width: 991px) {
        &:nth-child(-n + 3) {
          border-top: 0;
        }
        &:nth-child(3n + 3) {
          border-right: 0;
        }
        &:nth-child(-n + 2) {
          border-top: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
        }
        &:nth-child(2n + 2) {
          border-right: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
        }
      }
      @media only screen and (max-width: 480px) {
        &:nth-child(-n + 2) {
          border-top: 0;
        }
        &:nth-child(2n + 2) {
          border-right: 0;
        }
        &:nth-child(-n + 1) {
          border-top: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
        }
        &:nth-child(1n + 1) {
          border-right: 1px solid ${themeGet('colors.lightBorder', '#f1f4f6')};
        }
      }
      &:nth-child(2) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(50, 207, 167, 0.75),
              rgba(150, 201, 61, 0.75)
            );
          }
        }
      }
      &:nth-child(3) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(236, 0, 140, 0.75),
              rgba(255, 103, 103, 0.75)
            );
          }
        }
      }
      &:nth-child(4) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(47, 128, 237, 0.75),
              rgba(86, 204, 242, 0.75)
            );
          }
        }
      }
      &:nth-child(5) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(110, 72, 170, 0.75),
              rgba(192, 91, 210, 0.75)
            );
          }
        }
      }
      &:last-child {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(0, 57, 115, 0.75),
              rgba(299, 299, 199, 0.75)
            );
          }
        }
      }
    }
  }
`;

export default FeatureSectionWrapper;

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

export const CarouselWrapper = styled.div`
  margin-top: -30px;
  margin-right: -33px;
  margin-bottom: -50px;

  .glide__slide {
    padding-top: 30px;
    padding-right: 33px;
    padding-bottom: 50px;
  }

  .review-card {
    padding: 37px 40px 40px;
    border-radius: 5px;
    border: 1px solid ${themeGet('colors.lightBorder', '#F2F4F7')};
    transition: all 0.3s ease;
    @media only screen and (max-width: 480px) {
      padding: 25px 25px 30px;
    }

    &:hover {
      box-shadow: 0 10px 50px rgba(38, 78, 118, 0.1);
    }

    h3 {
      color: ${themeGet('colors.quoteText', '#343D48')};
      font-size: 16px;
      line-height: 33px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      color: ${themeGet('colors.quoteText', '#343D48')};
      font-size: 18px;
      line-height: 32px;
      font-weight: 300;
      @media only screen and (max-width: 667px) {
        font-size: 16px;
        line-height: 30px;
      }
    }

    .card-footer {
      display: flex;
      align-items: center;
      margin-top: 33px;
      @media only screen and (max-width: 480px) {
        align-items: flex-start;
        margin-top: 30px;
      }

      .image {
        flex-shrink: 0;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 6px 30px rgba(39, 79, 117, 0.2);
        }
      }

      .reviewer-info {
        width: calc(100% - 50px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 19px;
        @media only screen and (max-width: 480px) {
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
        }
      }

      .content {
        h4 {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 7px;
          color: ${themeGet('colors.headingColor', '#0F2137')};
          @media only screen and (max-width: 480px) {
            margin-bottom: 3px;
          }
        }
        p {
          font-size: 14px;
          line-height: 24px;
          color: rgba(15, 33, 52, 0.6);
          font-weight: 400;
          margin: 0;
        }
      }
    }

    .rating {
      flex-shrink: 0;
      @media only screen and (max-width: 480px) {
        margin-top: 2px;
      }
      i {
        margin-right: 2px;
        &:last-child {
          margin-right: 0;
        }
        @media only screen and (max-width: 480px) {
          svg {
            width: 14px;
            height: auto;
          }
        }
      }
      .star {
        color: ${themeGet('colors.yellowHover', '#F6C416')};
      }
      .star-o {
        color: ${themeGet('colors.gray', '#E4E4E4')};
      }
    }
  }

  .glide__controls {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    > div {
      position: absolute;
      top: calc(50% - 70px / 2);
      &.glide__prev--area {
        left: -24px;
        @media only screen and (max-width: 480px) {
          left: 12px;
        }
      }
      &.glide__next--area {
        right: 8px;
        @media only screen and (max-width: 480px) {
          right: 46px;
        }
      }
      .reusecore__button {
        &:hover {
          background-color: ${themeGet('colors.primaryHover', '#3C74FF')};
        }
      }
    }
  }

  .glide {
    &:hover {
      .glide__controls {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

export default SectionWrapper;

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.section`
  padding: 10px 0 81px;
  @media only screen and (max-width: 1440px) {
    padding: 10px 0 60px;
  }
  @media only screen and (max-width: 767px) {
    padding-bottom: 42px;
  }
  header {
    text-align: left;
    padding-bottom: 60px;
    @media only screen and (max-width: 1440px) {
      padding-bottom: 56px;
    }
    @media only screen and (max-width: 375px) {
      padding-right: 61px;
    }
  }

  #team_carousel {
    .glide__controls {
      margin: 0;
      position: absolute;
      top: -90px;
      right: 0;

      > div {
        > span {
          &.next_arrow {
            width: 45px;
            background-color: ${themeGet('colors.link', '#352FD9')};
            @media only screen and (max-width: 667px) {
              width: 30px;
            }

            &::before {
              background-color: ${themeGet('colors.link', '#352FD9')};
              transform: rotate(42deg);
            }

            &::after {
              transform: rotate(-42deg);
              background-color: ${themeGet('colors.link', '#352FD9')};
            }
          }
        }

        &:hover {
          > span {
            background-color: ${themeGet('colors.link', '#352FD9')};

            &::before,
            &::after {
              background-color: ${themeGet('colors.link', '#352FD9')};
            }

            &.next_arrow {
              width: 45px;
              &::before {
                transform: rotate(42deg);
              }
              &::after {
                transform: rotate(-42deg);
              }
            }
          }
        }
      }
    }
  }
`;

export const TeamCard = styled.div`
  position: relative;

  &:hover {
    .image_wrapper {
      &::before {
        opacity: 1;
        visibility: visible;
      }

      img {
        transform: scale(1.07);
      }
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 20px;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 150px;
    background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.8) 110%
    );
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
    visibility: hidden;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
`;

export const TextWrapper = styled.div`
  text-align: center;

  .name_plate {
    width: calc(100% - 120px);
    margin: -43px 0 20px 60px;
    padding: 16px;
    border-radius: 10px;
    background-color: ${themeGet('colors.primary', '#FDEF00')};
    position: relative;
    z-index: 1;
    @media only screen and (max-width: 1200px) {
      width: calc(100% - 80px);
      margin-left: 40px;
    }
    @media only screen and (max-width: 991px) {
      width: calc(100% - 30px);
      margin-left: 15px;
    }
    @media only screen and (max-width: 767px) {
      width: calc(100% - 60px);
      margin-left: 30px;
    }

    h3 {
      color: ${themeGet('colors.heading', '#191919')};
      font-size: 20px;
      line-height: 1;
      font-weight: 500;
      text-transform: capitalize;
      margin-bottom: 7px;
      @media only screen and (max-width: 991px) {
        font-size: 18px;
        margin-bottom: 4px;
      }
      @media only screen and (max-width: 667px) {
        font-size: 16px;
      }
    }

    p {
      color: ${themeGet('colors.heading', '#191919')};
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      @media only screen and (max-width: 991px) {
        font-size: 13px;
      }
      @media only screen and (max-width: 667px) {
        font-size: 12px;
      }
    }
  }

  .social_links {
    display: inline-flex;

    li {
      display: flex;
      align-items: center;
      margin: 0 7px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      a {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${themeGet('colors.heading3', '#273343')};
        transition: background-color 0.3s ease;

        &:hover {
          text-decoration: none;
          background-color: ${themeGet('colors.primary', '#FDEF00')};
        }
      }
    }
  }
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 250px;
`;

export default SectionWrapper;

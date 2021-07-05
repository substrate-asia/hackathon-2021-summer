import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import curvBg from 'common/assets/image/interior/curv-bg.svg';

const SectionWrapper = styled.section`
  padding: 130px 0 260px;
  margin-top: 140px;
  background-image: url(${curvBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top left;
  position: relative;
  @media only screen and (max-width: 1440px) {
    padding: 120px 0 190px;
    margin-top: 81px;
  }
  @media only screen and (max-width: 767px) {
    margin-top: 42px;
    padding: 82px 0;
  }

  header {
    text-align: left;
  }

  .container {
    position: relative;

    &::after {
      content: '';
      display: block;
      width: calc(100% + 30px);
      height: 70px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background-color: ${themeGet('colors.white', '#ffffff')};
      position: absolute;
      bottom: -260px;
      left: -15px;
      @media only screen and (max-width: 1440px) {
        bottom: -190px;
      }
      @media only screen and (max-width: 767px) {
        bottom: -82px;
      }
    }
  }
`;

export const ProjectWrapper = styled.div`
  display: flex;
  padding: 80px 60px;
  background-color: ${themeGet('colors.white', '#ffffff')};
  @media only screen and (max-width: 1200px) {
    padding: 40px;
  }
  @media only screen and (max-width: 991px) {
    padding: 0;
    background-color: transparent;
  }
  @media only screen and (max-width: 667px) {
    flex-wrap: wrap;
    padding: 0;
    flex-direction: column;
    background-color: transparent;
  }

  #project_carousel {
    width: calc(100% - 488px);
    @media only screen and (max-width: 1200px) {
      width: calc(100% - 460px);
    }
    @media only screen and (max-width: 991px) {
      width: calc(100% - 400px);
      margin-right: 40px;
    }
    @media only screen and (max-width: 667px) {
      width: 100%;
    }

    p {
      margin-bottom: 30px;
    }

    .glide__controls {
      margin-top: 20px;
      @media only screen and (max-width: 767px) {
        margin-top: 0;
      }
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
          }
        }
      }
    }
  }
`;

export const TextWrapper = styled.div``;

export const ImageWrapper = styled.div`
  width: 488px;
  position: relative;
  @media only screen and (max-width: 1200px) {
    width: 460px;
  }
  @media only screen and (max-width: 991px) {
    width: 350px;
  }
  @media only screen and (max-width: 667px) {
    width: 100%;
    margin-top: 54px;
  }

  img {
    position: absolute;
    bottom: -80px;
    right: 0;
    max-width: 100%;
    height: auto;
    @media only screen and (max-width: 1200px) {
      bottom: -50px;
    }
    @media only screen and (max-width: 767px) {
      position: initial;
      bottom: 0;
    }
  }
`;

export default SectionWrapper;

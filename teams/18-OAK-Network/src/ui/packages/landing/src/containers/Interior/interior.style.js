import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(7px);
  }
  100% {
    transform: translateX(0);
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    font-size: 36px;
    line-height: 56px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    @media only screen and (max-width: 1440px) {
      font-size: 34px;
      line-height: 48px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 30px;
      line-height: 42px;
    }
  }

  h2 {
    color: ${themeGet('colors.heading', '#191919')};
    font-size: 40px;
    line-height: 56px;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    @media only screen and (max-width: 1440px) {
      font-size: 36px;
      line-height: 52px;
    }
    @media only screen and (max-width: 1360px) {
      font-size: 30px;
      line-height: 46px;
    }
  }

  h3 {
    color: ${themeGet('colors.heading3', '#273343')};
    font-size: 24px;
    line-height: 36px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    @media only screen and (max-width: 1440px) {
      font-size: 22px;
      line-height: 32px;
    }
    @media only screen and (max-width: 991px) {
      font-size: 20px;
      line-height: 30px;  
    }
  }

  h4 {
    font-size: 22px;
    line-height: 32px;
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    @media only screen and (max-width: 1440px) {
      font-size: 20px;
      line-height: 30px;
    }
  }

  p {
    color: ${themeGet('colors.text', '#4E5865')};
    font-size: 16px;
    line-height: 26px;
    font-family: 'Roboto', sans-serif;
    @media only screen and (max-width: 1440px) {
      font-size: 15px;
    }
  }


  section {
    position: relative;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Modal style */ 
  button.modalCloseBtn {
    color: ${themeGet('colors.white', '#ffffff')} !important;
    &.alt {
      color: ${themeGet('colors.heading', '#191919')} !important;
      background-color: ${themeGet('colors.primary', '#FDEF00')} !important;
      box-shadow: 0 8px 38px rgba(253, 239, 0, 0.5) !important;
    }
  }

  .reuseModalHolder {
    border: 0 !important;
    background-color: transparent !important;
    &.search-modal {
      background-color: rgba(255, 255, 255, 0.96) !important;
      overflow-y: auto !important;
      .innerRndComponent {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        iframe {
          max-width: 700px !important;
          max-height: 380px !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 5px !important;
        }
      }
    }

    &.demo_switcher_modal {
      border: 0 !important;
      background-color: rgba(16, 30, 77, 0.8) !important;
      .innerRndComponent {
        border-radius: 8px !important;
      }
    }

    .innerRndComponent {
      padding-right: 0 !important;
    }
  }

  .reuseModalCloseBtn {
    cursor: pointer !important;
  }

  .reuseModalOverlay,
  .reuseModalParentWrapper{
    z-index: 99999!important;
  }

  .reuseModalHolder.login-modal{
    .reusecore__button {
      color: ${themeGet('colors.link', '#352FD9')};
      &.default {
        color: ${themeGet('colors.heading', '#191919')};
        background-color: ${themeGet('colors.primary', '#FDEF00')};
        &:hover {
          box-shadow: none;
        }
      }
    }
    @media (min-width: 768px) {
      top: 0!important;
      left: 0!important;
      max-width: 100%!important;
      max-height: 100%!important;
    }
  }

  .reuseModalHolder.search-modal{
    top: 0!important;
    left: 0!important;
    max-width: 100%!important;
    max-height: 100%!important;
    width: 100%;
    height: 100%;
  }

  .reuseModalHolder.login-modal .innerRndComponent{
    overflow-y: auto;
    padding-right: 30px !important;
    margin-right: -30px;
    overflow-x: hidden;
  }

  /* Drawer style */
  .drawer {
    .drawer-content-wrapper {
      @media only screen and (max-width: 480px) {
        width: 320px !important;
      }

      button {
        position: absolute;
        top: 35px;
        right: 27px;
        border: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;
        > i svg {
          width: auto;
          height: 35px;
          fill: ${themeGet('colors.heading', '#191919')};
        }
        &:hover {
          > i svg {
            fill: ${themeGet('colors.link', '#352FD9')};
          }
        }
      }

      .scrollspy__menu {
        padding: 60px 71px;
        max-height: 505px;
        overflow-x: auto;
        @media only screen and (max-width: 375px) {
          padding: 45px 56px;
        }
        @media only screen and (max-width: 320px) {
          max-height: 380px;
        }
        li {
          margin: 35px 0;
          @media only screen and (max-width: 667px) {
            margin: 30px 0;
          }
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
          a {
            display: block;
            color: ${themeGet('colors.heading', '#060F1E')};
            font-size: 22px;
            font-weight: 400;
            transition: all 0.3s ease;
            @media only screen and (max-width: 667px) {
              font-size: 20px;
            }
            &:hover {
              color: ${themeGet('colors.link', '#352FD9')};
            }
          }
          &.is-current {
            a {
              color: ${themeGet('colors.link', '#352FD9')};
              position: relative;
              &:before {
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: ${themeGet('colors.link', '#352FD9')};
                position: absolute;
                top: calc(50% - 8px / 2);
                left: -20px;
              }
            }
          }
        }
      }
      .copyright_section {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding-left: 71px;
        padding-bottom: 56px;
        background-color: ${themeGet('colors.white', '#ffffff')};
      }
    }
  }
`;

const InteriorWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;

  @media only screen and (max-width: 1440px) {
    .container {
      max-width: 1260px;
    }
  }

  /* ------------------------------- */
  /* Navbar style */
  /* ------------------------------- */
  .reusecore__navbar {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    padding: 22px 0;
    transition: padding 0.2s ease, background-color 0.1s ease;

    .reusecore__button {
      color: ${themeGet('colors.label', '#C6C6C6')};
      font-size: 20px;
      margin-right: 10px;
      @media only screen and (max-width: 1440px) {
        font-size: 18px;
        margin-right: 7px;
      }
    }

    .hamburgMenu__bar {
      > span {
        background-color: ${themeGet('colors.label', '#C6C6C6')};
      }
    }
  }

  .sticky-nav-active {
    .reusecore__navbar {
      padding: 16px 0;
      background-color: ${themeGet('colors.white', '#ffffff')};
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

      .reusecore__button {
        color: ${themeGet('colors.heading', '#060F1E')};
      }

      .hamburgMenu__bar {
        span {
          background-color: ${themeGet('colors.heading', '#060F1E')};
        }
      }

      .smooth_scroll {
        color: ${themeGet('colors.heading', '#060F1E')};
        transition: color 0.3s ease;
        &:hover {
          color: ${themeGet('colors.text', '#294859')};
        }
      }
    }
  }

  /* ------------------------------- */
  /* Load more btn style */
  /* ------------------------------- */
  .learn__more-btn {
    display: inline-flex;
    align-items: center;
    color: ${themeGet('colors.link', '#352FD9')};
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0;
    position: relative;
    @media only screen and (max-width: 1360px) {
      font-size: 14px;
    }

    .btn_text {
      z-index: 1;
      margin-right: 12px;
      text-transform: uppercase;
    }

    .next_arrow {
      width: 40px;
      height: 2px;
      background-color: ${themeGet('colors.link', '#352FD9')};
      position: relative;

      &::before,
      &::after {
        content: '';
        display: block;
        width: 12px;
        height: 2px;
        border-radius: 4px;
        background-color: ${themeGet('colors.link', '#352FD9')};
        position: absolute;
        right: 0;
        transition: all 0.3s ease;
      }

      &::before {
        transform: rotate(-42deg);
        transform-origin: top right;
      }

      &::after {
        transform: rotate(42deg);
        transform-origin: 12px 1px;
      }
    }

    &:hover {
      .next_arrow {
        animation: ${shake} 1s infinite;
      }
    }
  }

  .read_more__btn {
    display: inline-flex;
    align-items: center;
    color: ${themeGet('colors.heading3', '#273343')};
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    position: relative;
    transition: all 0.3s ease;

    .arrow {
      width: 24px;
      height: 2px;
      display: block;
      position: absolute;
      top: calc(50% - 1px);
      left: -15px;
      background-color: ${('colors.primary', '#FDEF00')};
      transition: all 0.3s ease;

      &::before,
      &::after {
        content: '';
        display: block;
        width: 10px;
        height: 2px;
        border-radius: 4px;
        background-color: ${('colors.primary', '#FDEF00')};
        position: absolute;
        right: 0;
        transition: transform 0.2s ease 0.1s;
      }

      &::before {
        transform: rotate(0);
        transform-origin: top right;
      }

      &::after {
        transform: rotate(0);
        transform-origin: 10px 2px;
      }
    }

    &:hover {
      .arrow {
        width: 28px;
        left: calc(100% + 10px);
        border-radius: 4px;
        background-color: ${themeGet('colors.link', '#352FD9')};

        &::before {
          transform: rotate(-42deg);
          transform-origin: top right;
          background-color: ${themeGet('colors.link', '#352FD9')};
        }

        &::after {
          transform: rotate(42deg);
          transform-origin: 10px 2px;
          background-color: ${themeGet('colors.link', '#352FD9')};
        }
      }
    }

    &:hover,
    &:focus {
      outline: 0;
      color: ${themeGet('colors.link', '#352FD9')};
    }
  }

  /* ------------------------------- */
  /* Glide controls style */
  /* ------------------------------- */
  .glide {
    .glide__controls {
      margin-top: 30px;
    }

    .glide__controls > div,
    .glide__arrows > button {
      height: 18px;
      padding: 0;
      border: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: transparent;

      .prev_arrow,
      .next_arrow {
        display: block;
        width: 24px;
        height: 2px;
        background-color: ${themeGet('colors.label', '#C6C6C6')};
        transition: width 0.3s ease;
        position: relative;
        @media only screen and (max-width: 667px) {
          width: 20px;
        }

        &::before,
        &::after {
          content: '';
          display: block;
          width: 14px;
          height: 2px;
          border-radius: 4px;
          background-color: ${themeGet('colors.label', '#C6C6C6')};
          position: absolute;
          z-index: 1;
          transition: all 0.3s ease;
        }

        &.next_arrow {
          &::before {
            right: 0;
            transform: rotate(0);
            transform-origin: top right;
          }
          &::after {
            right: 0;
            transform: rotate(0);
            transform-origin: 14px 2px;
          }
        }

        &.prev_arrow {
          &::before {
            left: 0;
            transform: rotate(0);
            transform-origin: top left;
          }
          &::after {
            left: 0;
            transform: rotate(0);
            transform-origin: 0 2px;
          }
        }
      }

      .next_arrow {
        margin-left: 15px;
      }

      &:hover {
        > span {
          width: 45px;
          border-radius: 4px;
          background-color: ${themeGet('colors.primary', '#FDEF00')};
          @media only screen and (max-width: 667px) {
            width: 30px;
          }

          &::before,
          &::after {
            background-color: ${themeGet('colors.primary', '#FDEF00')};
          }

          &.prev_arrow {
            &::before {
              transform: rotate(-42deg);
            }
            &::after {
              transform: rotate(42deg);
            }
          }

          &.next_arrow {
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
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  width: 100%;
  overflow: hidden;
`;

/* ------------------------------------ */
// style for section header
/* ------------------------------------ */
const SectionHeader = styled.header`
  text-align: center;
  padding-bottom: 70px;
  @media only screen and (max-width: 1440px) {
    padding-bottom: 56px;
  }
  @media only screen and (max-width: 1200px) {
    padding-bottom: 50px;
  }
  @media only screen and (max-width: 991px) {
    padding-bottom: 40px;
  }
  @media only screen and (max-width: 480px) {
    text-align: left;
  }

  h5 {
    color: ${themeGet('colors.link', '#352FD9')};
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0 0 15px;
    @media only screen and (max-width: 1200px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 480px) {
      font-size: 13px;
    }
  }

  h2 {
    color: ${themeGet('colors.heading', '#191919')};
    font-size: 36px;
    line-height: 54px;
    font-weight: 600;
    margin: 0;
    @media only screen and (max-width: 1440px) {
      font-size: 30px;
      line-height: 46px;
    }
    @media only screen and (max-width: 1200px) {
      font-size: 28px;
      line-height: 42px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 24px;
      line-height: 35px;
    }
  }
`;

/* ------------------------------------ */
// style for circle loader
/* ------------------------------------ */
const rotate = keyframes`
	to {
		transform: rotate(360deg);
	}
`;

const grow = keyframes`
	50% {
		transform: scale(1);
	}
`;

const CircleLoader = styled.div`
  animation: ${rotate} 3s linear infinite;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  transform-origin: bottom center;

  .circle {
    animation: ${grow} 1.5s linear infinite;
    background-color: ${themeGet('colors.primary', '#FDEF00')};
    border-radius: 50%;
    display: inline-block;
    margin: -9px;
    height: 40px;
    width: 40px;
    transform: scale(0);

    &:nth-of-type(2) {
      animation-delay: 0.75s;
      background-color: ${themeGet('colors.white', '#ffffff')};
    }
  }

  &.alt {
    .circle {
      &:nth-of-type(2) {
        background-color: ${themeGet('colors.heading', '#191919')};
      }
    }
  }
`;

export {
  GlobalStyle,
  InteriorWrapper,
  ContentWrapper,
  SectionHeader,
  CircleLoader,
};

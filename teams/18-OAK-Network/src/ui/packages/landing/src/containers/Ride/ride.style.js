import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Poppins', sans-serif;
    margin-top: 0;
  }
  p{
    font-family: 'Lato', sans-serif;
  }

  section {
    position: relative;
  }


  .drawer-content-wrapper{
    @media (max-width: 767px) {
      width: 300px!important;
    }
    .drawer-content {
      padding: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media (max-width: 767px) {
        padding: 50px 40px 30px 40px;
      }
      .mobile_menu {
        margin-bottom: 40px;
        flex-grow: 1;
        @media (max-width: 767px) {
          margin-bottom: 30px;
        }
        li{
          margin-bottom: 35px;
          @media (max-width: 767px) {
            margin-bottom: 25px;
          }
          a{
            font-size: 20px;
            font-weight: 500;
            color: #000;
            position: relative;
            font-family: 'Raleway', sans-serif;
            transition: 0.15s ease-in-out;
            @media (max-width: 767px) {
              font-size: 18px;
            }
            &:hover {
              &:before {
                transform: scaleX(1);
                transform-origin: left center 0;
                transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
              }
            }
            &:before{
              content: '';
              position: absolute;
              width: calc(100% - 8px);
              height: 11px;
              background: #c2c7fb;
              bottom: 2px;
              left: -4px;
              z-index: -1;
              transform: scaleX(0);
              transform-origin: right center 0;
              transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
            }
          }
          &.is-current {
            a {
              &:before {
                transform: scaleX(1);
                transform-origin: left center 0;
                transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
              }
            }
          }
        }
      }
      .navbar_drawer_button button{
        width: 100%;
        font-family: 'Raleway', sans-serif;
      }
    }

    .reusecore-drawer__close{
      width: 34px;
      height: 34px;
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      @media (max-width: 767px) {
        top: 15px;
        right: 15px;
      }
      &:before{
        content: '\f10b';
        font-family: Flaticon;
        font-size: 26px;
        color: #3444f1;
        transform: rotate(45deg);
        display: block;
      }
    }
  }

`;

export const ContentWrapper = styled.div`
  overflow: hidden;
  .menuLeft {
    margin-left: 105px;
  }
  .menuRight {
    margin-left: auto;
  }
  .sticky-nav-active {
    .hosting_navbar {
      background: #fff;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
      padding: 15px 0;
      @media (min-width: 1440px) {
        padding: 25px 0;
      }

      .main-logo {
        display: none;
      }
      .logo-alt {
        display: block;
      }
    }
  }
  .portfolio_button {
    border-radius: 0;
    border: 2px solid ${themeGet('colors.borderColor', '#1b1e25')};
    background-color: transparent;
    position: relative;
    min-height: 50px;
    text-transform: initial;
    transition: 0.2s ease-in-out;
    &:before {
      content: '';
      background-color: ${themeGet('colors.primary', '#3444f1')};
      position: absolute;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      display: block;
      z-index: -1;
      top: 8px;
      left: 8px;
      transition: inherit;
    }
    &:hover {
      border-color: transparent;
      &:before {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  .hosting_navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: 0.35s ease-in-out;
    padding: 35px 0 30px 0;
    @media (max-width: 990px) {
      padding: 30px 0;
    }
    .logo-alt {
      display: none;
    }
    .main_menu {
      margin-right: 40px;
      li {
        display: inline-block;
        padding-left: 30px;
        padding-right: 30px;
        color: #000;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
        &.is-current {
          a {
            color: #000;
            &:after {
              transform: scaleX(1);
              transform-origin: left center 0;
              transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
            }
          }
        }
        a {
          padding: 5px 0;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;
          color: #15172c;
          position: relative;
          transition: 0.15s ease-in-out;
          &:hover {
            color: #15172c;
            &:after {
              transform: scaleX(1);
              transform-origin: left center 0;
              transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
            }
          }
          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 9px;
            background: linear-gradient(to left, #b8aee6, #c2c7fb);
            bottom: 5px;
            left: 6px;
            z-index: -1;
            transform: scaleX(0);
            transform-origin: right center 0;
            transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
          }
        }
      }
      @media (max-width: 990px) {
        display: none;
      }
    }
    .navbar_button {
      button {
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
      }
      @media (max-width: 990px) {
        display: none;
      }
    }
    .reusecore-drawer__handler {
      @media (min-width: 991px) {
        display: none !important;
      }
      .hamburgMenu__bar {
        > span {
        }
      }
    }
  }

  .sticky-nav-active {
    .hosting_navbar {
      .main_menu {
        li {
          a {
            color: #302b4e;
            &:after {
              background: #c2c7fb;
            }
          }
        }
      }
    }
  }
`;

import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body{
    font-family: 'DM Sans', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'DM Sans', sans-serif;
  }

  section {
    position: relative;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    padding-left: 15px;
    padding-right: 15px;
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
            font-weight: 400;
            color: #343d48;
            position: relative;
            transition: 0.15s ease-in-out;
            @media (max-width: 767px) {
              font-size: 18px;
            }
            &:hover {
              color: #eb4d4b;
            }
            &:before{
              content: '';
              width: 7px;
              height: 7px;
              background: #eb4d4b;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: -15px;
              transform: translateY(-50%);
              opacity: 0;
            }
          }
          &.is-current {
            a {
              color: #eb4d4b;
              &:before{
                opacity: 1;
              }
            }
          }
        }
      }
      .navbar_drawer_button button{
        width: 100%;
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
        color: #eb4d4b;
        transform: rotate(45deg);
        display: block;
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  min-width: 300px;
  position: relative;

  overflow: hidden;
  .sticky-nav-active {
    .sassminimal_navbar {
      background: #fff;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
      padding: 15px 0;
      .main-logo {
        display: none;
      }
      .stricky-logo {
        display: block;
      }
      .main_menu li a {
        color: #00005c;
      }
      .main_menu li:hover a,
      .main_menu li.is-current a {
        color: #c36276;
      }
      .navbar_button .reusecore__button:hover {
        background-color: #c36276;
        color: #fff;
      }
      .reusecore-drawer__handler {
        .hamburgMenu__bar {
          > span {
            background-color: #00005c;
          }
        }
      }
    }
  }

  .sassminimal_navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: 0.35s ease-in-out;
    padding: 30px 0;

    .main-logo {
      display: block;
    }
    .stricky-logo {
      display: none;
    }
    .mainMenuWrapper {
      flex: 1 1 100%;

      @media (max-width: 991px) {
        flex: 0 0 auto;
        margin-left: auto;
      }
    }
    .main_menu {
      margin-left: 45px;
      li {
        display: inline-block;
        padding-left: 13px;
        padding-right: 13px;
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          padding-right: 0;
        }
        &.is-current {
          a {
            color: #00005c;
          }
        }
        a {
          padding: 5px;
          transition: 0.15s ease-in-out;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          color: #ffffff;
          &:hover {
            color: #00005c;
          }
        }
      }
      @media (max-width: 990px) {
        display: none;
      }
    }
    .navbar_button {
      margin-left: auto;

      .reusecore__button {
        border: none;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 20px;
        padding: 0;
        display: flex;
        align-items: center;
        text-align: center;
        background-color: #00005c;
        border-radius: 5px;
        color: #ffffff;
        padding: 0px 12px;
        height: 42px;
        transition: all 500ms ease;

        &:hover {
          background-color: #fff;
          color: #00005c;
        }
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
          background-color: #fff;
        }
      }
    }
  }
`;

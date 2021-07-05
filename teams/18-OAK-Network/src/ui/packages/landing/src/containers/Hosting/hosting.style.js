import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import FeatureBlock from 'common/components/FeatureBlock';

export const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Roboto', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Roboto', sans-serif;
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
  

  /* Modal default style */
  button.modalCloseBtn {
    color: ${themeGet('colors.white', '#ffffff')} !important;

    &.alt {
      background-color: ${themeGet('colors.primary', '#5268db')} !important;
      box-shadow: 0px 9px 20px -5px rgba(82, 104, 219, 0.57) !important;
    }
  }
`;

export const ContentWrapper = styled.div`
  overflow: hidden;
  .sticky-nav-active {
    .hosting_navbar {
      background: #fff;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
      padding: 15px 0;
    }
  }

  .hosting_navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: 0.35s ease-in-out;
    padding: 30px 0;
    .main_menu {
      margin-right: 40px;
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
            color: #eb4d4b;
          }
        }
        a {
          padding: 5px;
          font-size: 16px;
          font-weight: 400;
          color: #343d48;
          transition: 0.15s ease-in-out;
          &:hover {
            color: #eb4d4b;
          }
        }
      }
      @media (max-width: 990px) {
        display: none;
      }
    }
    .navbar_button {
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

  .info-sec-container {
    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
    @media (max-width: 768px) and (min-width: 768px) {
      top: 40%;
    }
    @media (max-width: 767px) {
      padding-top: 40px;
    }
  }

  .accordion_item {
    border-bottom: 1px solid #ebebeb;
    border-top: 0;
  }

  .accordion_title {
    padding: 23px 30px;
    @media (max-width: 575px) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .accordion_body {
    padding: 0 30px 23px 30px;
  }

  .service_section {
    background: linear-gradient(
      to bottom,
      #ffffff 0%,
      #f9fbfd 50%,
      #f9fbfd 100%
    );

    .service_col {
      border-width: 1px 0 0 1px;
      border-style: solid;
      border-color: #f1f4f6;
      &:nth-child(3n + 3),
      &:last-child {
        border-right-width: 1px;
      }
      &:nth-last-child(-n + 3) {
        border-bottom-width: 1px;
      }
      .service_item {
        position: relative;
        height: 100%;
        transition: 0.2s ease-in-out;

        &:hover {
          box-shadow: 0 40px 90px -30px rgba(39, 79, 117, 0.2);
          z-index: 1;
        }

        &:before {
          content: '';
          position: absolute;
          width: 85%;
          height: 0;
          bottom: 0;
          left: 50%;
          display: block;
          pointer-events: 0;
          transform: translateX(-50%);
        }
        &:hover {
          &:before {
            box-shadow: 0px 0px 60px 0px rgba(39, 79, 117, 0.2);
          }
        }

        img {
          width: 80px;
          height: 70px;
        }
      }
    }
  }

  @media (max-width: 990px) {
    .glide__slide--active .pricing_table {
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
      border: 0;
    }
  }
`;

export const FeatureItem = styled(FeatureBlock)`
  position: relative;
  padding: 50px 30px;
  border: 1px solid #f2f4f7;
  border-radius: 5px;
  background-color: #fff;
  transition: 0.35s ease-in-out;
  @media (max-width: 768px) and (min-width: 768px) {
    padding: 30px 20px;
  }
  @media (max-width: 575px) {
    padding: 40px 25px;
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(
      138deg,
      rgb(249, 212, 35) 0%,
      rgb(255, 78, 80) 100%
    );
    transition: 0.35s ease-in-out;
  }

  & > div {
    position: relative;
  }

  h2,
  p {
    transition: 0.35s ease-in-out;
  }

  .hover-shape {
    width: 20px;
    height: auto;
    position: absolute;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    transition: 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: rotate(260deg);
  }

  .hover-shape-1 {
    left: 0;
    top: 20px;
  }

  .hover-shape-2 {
    right: 29%;
    top: 0;
  }

  .hover-shape-3 {
    right: 0;
    bottom: 35%;
  }

  .hover-shape-4 {
    right: 30%;
    bottom: 0;
  }

  .hover-shape-5 {
    left: 0;
    bottom: 30%;
  }

  .icon__wrapper {
    margin-bottom: 40px;
    @media (max-width: 768px) and (min-width: 768px) {
      margin-bottom: 30px;
    }
    @media (max-width: 575px) {
      margin-bottom: 25px;
    }
    i {
      line-height: 1;
      font-size: 65px;
      transition: 0.35s ease-in-out;
      @media (max-width: 768px) and (min-width: 768px) {
        font-size: 50px;
      }
      &.violate {
        color: #8569ff;
      }
      &.yellow {
        color: #ffb129;
      }
      &.green {
        color: #18d379;
      }
    }
  }

  .button__wrapper {
    a {
      color: #c2cbd6;
      font-size: 24px;
      transition: 0.35s ease-in-out;
      @media (max-width: 768px) and (min-width: 768px) {
        font-size: 20px;
      }
      @media (max-width: 575px) {
        font-size: 22px;
      }
    }
  }

  &:hover {
    background-color: #eb4d4b;
    &:before {
      opacity: 0.37;
    }

    .hover-shape-1 {
      left: -40px;
      top: 20px;
    }
    .hover-shape-2 {
      right: 29%;
      top: -47px;
    }
    .hover-shape-3 {
      right: -27px;
      bottom: 35%;
    }
    .hover-shape-4 {
      right: 30%;
      bottom: -60px;
    }
    .hover-shape-5 {
      left: -35px;
      bottom: 30%;
    }
    .hover-shape {
      transform: rotate(0);
      opacity: 1;
    }

    h2,
    p {
      color: #fff;
    }

    .icon__wrapper {
      i {
        color: #fff;
      }
    }

    .button__wrapper {
      a {
        color: #fff;
      }
    }
  }
`;

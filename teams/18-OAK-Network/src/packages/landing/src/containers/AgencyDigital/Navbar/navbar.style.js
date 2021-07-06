import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import navBg from 'common/assets/image/agencyModern/nav-bg.png';

const NavbarWrapper = styled.header`
  width: 100%;
  padding: 15px 0 16px;
  background-color: transparent;
  z-index: 9999;
  transition: all 0.3s ease;
  @media only screen and (max-width: 1366px) {
    padding: 20px 0 21px;
  }
  > div.container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .main-logo {
    min-width: 145px;
    max-width: 145px;
  }
`;

export const MenuArea = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  .menubar {
    display: none;
  }
  @media only screen and (max-width: 1024px) {
    justify-content: flex-end;
  }
  @media only screen and (max-width: 411px) and (max-height: 812px) and (orientation: landscape) {
    .menubar {
      display: block;
    }
  }
  @media only screen and (max-width: 768px) {
    .menubar {
      display: block;
    }
  }
  .menu-items {
    display: flex;
    align-items: center;
    margin-right: 11px;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease;
    margin-left: 100px;
    @media only screen and (max-width: 1366px) {
      margin-right: 13px;
    }
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
      margin-left: 50px;
    }
    @media only screen and (max-width: 411px) and (max-height: 812px) and (orientation: landscape) {
      display: none;
    }
    @media only screen and (max-width: 768px) {
      display: none;
    }
    li {
      padding: 10px 0;
      margin: 0 19px;
      a {
        color: ${themeGet('colors.menu', '#02073E')};
        font-family: DM Sans;
        font-size: 16px;
        font-weight: 400;
        transition: all 0.3s ease;
        &:hover {
          color: ${themeGet('colors.menu', '#FF825C')};
        }
      }
      &.is-current {
        background: transparent url(${navBg}) no-repeat center bottom / contain;
        a {
          color: ${themeGet('colors.menu', '#FF825C')};
        }
      }
      @media only screen and (max-width: 1366px) {
        margin: 0 17px;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .menu-right {
    margin-left: auto;
  }
  &.active {
    .menu-items {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

export const NavbarRight = styled.ul`
  display: flex;
  align-items: center;
  margin-left: auto;
  @media only screen and (max-width: 411px) and (max-height: 812px) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  li {
    margin-left: 38px;
    a {
      color: ${themeGet('colors.menu', '#02073E')};
      font-family: DM Sans;
      font-size: 16px;
      font-weight: 400;
      transition: all 0.3s ease;
      &:hover {
        color: ${themeGet('colors.menu', '#FF825C')};
      }
    }
  }
`;

export const MobileMenu = styled.div`
  display: none;
  @media only screen and (max-width: 991px) {
    display: flex;
    width: 100%;
    height: calc(100vh - 70px);
    padding: 27px 0 40px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 82px;
    flex-direction: column;
    background-color: ${themeGet('colors.white', '#ffffff')};
    transition: all 0.3s ease;
    color: ${themeGet('colors.secondary', '#000')};
    &.active {
      opacity: 1;
      visibility: visible;
      box-shadow: 0 3px 12px
        ${themeGet('colors.shadow', 'rgba(38, 78, 118, 0.1)')};
    }
    .container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    ul {
      padding-bottom: 20px;
      li {
        a {
          display: block;
          padding: 13px 0;
          border-radius: 5px;
          transition: all 0.3s ease;
          color: ${themeGet('colors.textPrimary', '#02073E')};
        }
        &:hover {
          a {
            padding: 13px 15px;
            color: ${themeGet('colors.primary')};
          }
        }
      }
    }
    .reusecore__button {
      width: 100%;
      border-radius: 4px;
      background-image: -moz-linear-gradient(
        -31deg,
        rgb(64, 219, 216) 0%,
        rgb(44, 31, 132) 100%
      );
      background-image: -webkit-linear-gradient(
        -31deg,
        rgb(64, 219, 216) 0%,
        rgb(44, 31, 132) 100%
      );
      background-image: -ms-linear-gradient(
        -31deg,
        rgb(64, 219, 216) 0%,
        rgb(44, 31, 132) 100%
      );
      @media only screen and (max-width: 480px) {
        margin-top: 20px;
      }
    }
  }
`;

export default NavbarWrapper;

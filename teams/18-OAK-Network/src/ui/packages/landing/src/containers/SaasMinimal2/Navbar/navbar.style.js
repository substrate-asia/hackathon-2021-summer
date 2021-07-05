import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const Header = styled.header`
  background-color: transparent;
  padding: 15px 0 16px;
  transition: all 0.3s ease;
  position: fixed;
  z-index: 9999;
  width: 100%;
  @media only screen and (max-width: 1366px) {
    padding: 20px 0 21px;
  }
  > div.container {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  margin-right: 80px;
  min-width: 143px;
  position: relative;
  display: flex;
  align-items: center;
  a {
    margin-right: 0;
    position: absolute;
  }
`;

export const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  .menubar {
    display: none;
    color: #fff;
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
    flex-grow: 1;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease;
    @media only screen and (max-width: 768px) {
      display: none;
    }
    li {
      padding: 10px 0;
      margin: 0 19px;
      a {
        color: #fff;
        font-size: 15px;
        line-height: 1.33;
        font-weight: 500;
        transition: all 0.3s ease 0s;
        &:hover {
          color: ${themeGet('colors.primary')};
        }
      }
      @media only screen and (max-width: 1366px) {
        margin: 0 17px;
      }
      &:first-child {
        margin-left: 0;
      }
      &:nth-last-child(2) {
        margin-left: auto;
        a {
          font-weight: 700;
          display: inline-flex;
          padding-bottom: 4px;
          border-bottom: 1px solid ${rgba('#fff', 0.6)};
          &:hover {
            color: ${themeGet('colors.white')};
          }
        }
      }
      &:last-child {
        margin: 0;
        a {
          @media only screen and (min-width: 769px) {
            background-color: ${themeGet('colors.white')};
            color: ${themeGet('colors.primary')};
            display: inline-flex;
            align-items: center;
            border-radius: 100px;
            font-weight: 700;
            min-height: 45px;
            padding: 0 22px;
            &:hover {
              /* color: #fff; */
            }
          }
        }
      }
    }
    .is-current {
      a {
        color: ${themeGet('colors.white')};
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

export default Header;

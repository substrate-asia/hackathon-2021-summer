import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const NavbarWrapper = styled.header`
  padding: 15px 0 16px;
  background-color: transparent;
  position: fixed;
  top: 0;
  transition: all 0.3s ease;
  width: 100%;
  z-index: 9999;
  @media only screen and (max-width: 1366px) {
    padding: 20px 0 21px;
  }
  > div.container {
    display: flex;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  min-width: 150px;
  position: relative;
  min-height: 40px;
  margin-right: 80px;
  margin-top: 3px;
  @media only screen and (max-width: 1024px) {
    margin-right: 25px;
  }
  img {
    max-width: 150px;
  }
`;

export const MenuArea = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    /* position: absolute;
    background-color: #fff;
    left: 0;
    top: 100%; */
  }
  .menubar {
    display: none;
    @media only screen and (max-width: 1024px) {
      display: block;
      margin-left: auto;
      min-width: auto;
      transition: 0.3s ease-in-out 0s;
    }
  }
  .menu-items {
    align-items: center;
    display: flex;
    flex-grow: 1;
    @media only screen and (max-width: 1024px) {
      display: none;
    }
    li {
      a {
        color: ${themeGet('colors.textPrimary')};
        display: block;
        font-size: 15px;
        margin: 0 15px;
        transition: 0.3s ease-in-out 0s;
        &:hover {
          color: ${themeGet('colors.primary')};
        }
        @media only screen and (max-width: 768px) {
          color: ${themeGet('colors.textPrimary')};
          padding: 10px;
        }
      }
      &:last-child {
        margin-left: auto;
      }
    }
  }
`;

export const MobileMenu = styled.div`
  display: none;
  @media only screen and (max-width: 1024px) {
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
  }
`;

export default NavbarWrapper;

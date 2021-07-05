import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const HeaderWrapper = styled.header`
  background-color: #fff;
  padding: 15px 0;
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }
  .menubar {
    display: none;
    @media only screen and (max-width: 768px) {
      display: block;
    }
  }
`;

export const Logo = styled.div`
  margin-right: 50px;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    margin-right: 25px;
  }
`;

export const PrimaryNav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    display: none;
  }
  .primaryNav {
    display: flex;
    width: 100%;
    li {
      a {
        color: ${themeGet('colors.textPrimary', '#02073E')};
        display: inline-flex;
      }
      margin-right: 24px;
      &:last-child {
        margin-left: auto;
      }
    }
    .is-current a {
      color: ${themeGet('colors.secondary')};
    }
  }
  .joinButton {
    white-space: nowrap;
    button {
      @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
        font-size: 14px;
        min-width: auto;
        padding: 0 10px;
        min-height: 32px;
      }
    }
  }
`;

export const MobileNav = styled.nav`
  background-color: #fff;
  padding: 30px;
  opacity: 0;
  visibility: hidden;
  left: 0;
  right: 0;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.15) 0 10px 13px 0px;
  top: 100%;
  transition: 0.3s ease 0s;
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
  .mobileNav {
    li {
      a {
        color: ${themeGet('colors.textPrimary', '#02073E')};
        display: flex;
        padding: 13px 0;
      }
      margin-right: 24px;
      &:last-child {
        margin-left: auto;
      }
    }
    .is-current a {
      color: ${themeGet('colors.secondary')};
    }
  }
  .joinButton {
    margin-top: 15px;
    display: block;
  }
`;

export default HeaderWrapper;

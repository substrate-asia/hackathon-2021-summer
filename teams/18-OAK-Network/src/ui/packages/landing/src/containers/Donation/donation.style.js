import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'DM Sans', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'DM Sans', sans-serif;
    margin-top: 0;
  }

  p,
  input,
  textarea {
    font-family: 'DM Sans', sans-serif;
  }

  section {
    position: relative;
  }

  [class^="style__ContainerWrapper-"] {
    @media only screen and (min-width: 1200px) and (max-width: 1366px) {
      max-width: 1170px;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  
  .logo-white {
    opacity: 0;
    visibility: hidden;
  }
  
  .is-sticky {
    .navbar {
      background-color: #fff;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .logo-white {
      opacity: 1;
      visibility: visible;
    }
    .logo-white {
      opacity: 0;
      visibility: hidden;
    }
    .menu-items {
      li {
        a {
          color: ${themeGet('colors.text')};
          &:hover {
            color: ${themeGet('colors.primary')};
          }
        }
        &.is-current a {
          color: ${themeGet('colors.primary')};
        }
        &:last-child {
          
        }
      }
    }
    .menubar svg {
      color: ${themeGet('colors.textPrimary')};
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
    .agencyModern-navbar {
      background-color: #fff;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
    }
  }
`;

export const CovidMap = styled.div`
  padding-top: 70px;
  background: linear-gradient(
    180deg,
    #f9fafc 89.1%,
    rgba(249, 250, 252, 0) 100%
  );
  position: relative;
  z-index: 0;
  @media only screen and (max-width: 768px) {
    padding-top: 50px;
  }
  &::before {
    background-color: #fff;
    content: '';
    height: 165px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`;

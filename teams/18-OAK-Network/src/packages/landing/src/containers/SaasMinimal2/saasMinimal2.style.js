import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const GlobalStyle = createGlobalStyle`
   
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-family: 'DM Sans', sans-serif;
    margin-top: 0;
  }

  input,
  button,
  textarea {
    font-family: 'DM Sans', sans-serif;
  }

  figure {
    margin: 0;
  }
  
  section {
    position: relative;
  }

  .reuseModalHolder {
    border: 0 !important;
    background-color: transparent !important;
    
    &.video-modal {
      background-color: transparent !important;
      display: flex;
      align-items: center;
    }
    .innerRndComponent {
      height: auto;
      margin: 0 auto;
      width: 60%;
      @media only screen and (max-width: 1024px) {
        width: 90%;
      }
      @media only screen and (max-width: 768px) {
        width: 100%;
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

  .logo-container {
    .logo-sticky {
      display: none;
    }
  }

  .is-sticky {
    .navbar {
      background-color: #fff;
      box-shadow: 0px 3px 8px 0px rgba(43, 83, 135, 0.08);
    }
    .logo-container {
      .logo {
        display: none;
      }
      .logo-sticky {
        display: block;
      }
    }
    .menu-items {
      li {
        a {
          color: ${themeGet('colors.textPrimary')};
        }
        &:nth-last-child(2) a {
          border-bottom-color: rgba(0, 0, 0, 0.6);
          &:hover {
            color: ${themeGet('colors.primary')};
          }
        }
        &:last-child a {
          background-color: ${themeGet('colors.primary')};
          color: ${themeGet('colors.white')};
        }
      }
      .is-current {
        a {
          color: ${themeGet('colors.primary')};
        }
      }
    }
    .menubar {
      color: #02073e;
    }
  }
`;

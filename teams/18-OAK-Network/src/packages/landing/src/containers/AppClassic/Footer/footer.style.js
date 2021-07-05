import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const FooterArea = styled.footer`
  padding: 96px 0 60px;
  margin-top: 75px;
  background-color: ${themeGet('colors.secondary', '#09142E')};
  @media only screen and (max-width: 1366px) {
    padding-top: 80px;
    margin-top: 60px;
  }
  @media only screen and (max-width: 667px) {
    padding-top: 80px;
    padding-bottom: 50px;
    margin-top: 45px;
  }
  .logo {
    img {
      width: 128px;
      height: auto;
    }
  }
`;

export const WidgetArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .col {
    width: calc(100% / 3);
    text-align: center;
    padding: 0 21px;
    margin-bottom: 50px;
    @media only screen and (max-width: 991px) {
      padding: 0 15px;
    }
    @media only screen and (max-width: 667px) {
      width: calc(100% / 2);
      padding: 0 20px;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
    }

    img {
      display: inline-block;
      height: 41px;
      width: auto;
      margin-bottom: 27px;
      @media only screen and (max-width: 1366px) {
        height: 35px;
      }
      @media only screen and (max-width: 1366px) {
        margin-bottom: 20px;
      }
    }

    h3 {
      color: ${themeGet('colors.white', '#ffffff')};
      font-size: 18px;
      line-height: 24px;
      font-weight: 500;
      @media only screen and (max-width: 1366px) {
        font-size: 16px;
        line-height: 20px;
      }
      @media only screen and (max-width: 480px) {
        font-size: 18px;
      }
    }

    p {
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 0;
      @media only screen and (max-width: 480px) {
        font-size: 15px;
        line-height: 26px;
      }
    }
  }
`;

export const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  @media only screen and (max-width: 1366px) {
    padding-top: 50px;
  }
  > a {
    margin-right: 0;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 37px;
  margin-bottom: 15px;
  @media only screen and (max-width: 667px) {
    margin-top: 30px;
  }
`;

export const MenuItem = styled.li`
  margin: 0 18px;
  @media only screen and (max-width: 667px) {
    margin: 5px 15px;
  }
  a {
    color: ${themeGet('colors.white', '#ffffff')};
    transition: all 0.3s ease;
    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const CopyrightText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0;
  font-size: 14px;
`;

export default FooterArea;

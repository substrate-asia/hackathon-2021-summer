import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const SectionWrapper = styled.div`
  padding-bottom: 0px;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .image {
    position: relative;
    width: calc(100% - 465px);
    @keyframes bubbleLeftRight {
      0% {
        transform: translateX(0px);
      }
      25% {
        transform: translateX(5px);
      }
      50% {
        transform: translateX(15px);
      }
      75% {
        transform: translateX(5px);
      }
      100% {
        transform: translateX(0px);
      }
    }
    img.bubble-image {
      position: absolute;
      bottom: 120px;
      animation: bubbleLeftRight 10s linear infinite;
      right: 0px;
      @media (max-width: 1600px) {
        right: -90px;
      }
      @media (max-width: 991px) {
        display: none;
      }
    }
    @media (max-width: 1600px) {
      width: calc(100% - 570px);
    }
    @media only screen and (max-width: 991px) {
      margin-bottom: 40px;
      width: calc(100%);
      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }
    @media only screen and (max-width: 667px) {
      width: 100%;
    }
  }
  .content {
    width: 465px;
    @media (max-width: 1600px) {
      margin-left: 100px;
    }
    @media only screen and (max-width: 991px) {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
    @media only screen and (max-width: 667px) {
      width: 100%;
    }
    h2 {
      color: ${themeGet('colors.headingColor', '#09131F')};
      font-size: 40px;
      line-height: 1.35;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
      font-weight: 500;
      @media (max-width: 1600px) {
        font-size: 32px;
      }
      @media (max-width: 575px) {
        font-size: 22px;
      }
    }
    p {
      font-size: 16px;
      font-weight: normal;
      line-height: 2;
      margin-bottom: 35px;
      color: ${themeGet('colors.textColor', '#343D48')};
      @media only screen and (max-width: 1600px) {
        margin-bottom: 30px;
      }
    }
  }
  .button {
    display: inline-block;
    background-color: #23374d;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 20px 35px;
    border-radius: 30px;
    transition: all 500ms ease;
    &:hover {
      background-color: #108aff;
    }
    > i {
      margin-left: 5px;
    }
    @media (max-width: 1600px) {
      font-size: 14px;
    }
  }
`;

export default SectionWrapper;

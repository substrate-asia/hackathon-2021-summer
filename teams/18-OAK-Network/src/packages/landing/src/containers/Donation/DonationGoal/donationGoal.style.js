import styled from 'styled-components';
import { rgba } from 'polished';
import { themeGet } from '@styled-system/theme-get';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import fundraisersImage from 'common/assets/image/donation/fund-rising/1.png';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 70px 0;
  @media only screen and (max-width: 768px) {
    padding: 50px 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled.div`
  width: 50%;
  @media only screen and (max-width: 991px) {
    width: 42%;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const TextWrapper = styled.div`
  width: calc(50% - 30px);
  margin-right: 30px;
  @media only screen and (max-width: 1366px) {
    width: 44%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    margin-top: 30px;
    max-width: 490px;
    margin: 0 auto;
    text-align: center;
  }

  h2 {
    color: ${themeGet('colors.textPrimary')};
    font-size: 40px;
    line-height: 1.62;
    letter-spacing: -1px;
    @media only screen and (max-width: 1366px) {
      font-size: 34px;
      margin-bottom: 15px;
    }
    @media only screen and (max-width: 1024px) {
      font-size: 24px;
    }
  }

  .desc {
    line-height: 2.19;
    @media only screen and (max-width: 1440px) {
      font-size: 16px;
    }
    @media only screen and (max-width: 1360px) {
      font-size: 15px;
    }
    @media only screen and (max-width: 1024px) {
      line-height: 1.8;
    }
    a {
      font-size: 15px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      color: ${themeGet('colors.linkColor')};
      letter-spacing: -0.2px;
      margin-left: 10px;
      i {
        line-height: 1;
        margin-left: 2px;
        transition: 0.3s ease 0s;
      }
      &:hover i {
        margin-left: 5px;
      }
    }
  }
`;

export const DonationProgressbar = styled.div`
  width: 100%;
  margin-top: 50px;
  @media only screen and (max-width: 1200px) {
    margin-top: 30px;
  }

  p {
    margin-top: 0;
    @media only screen and (max-width: 991px) {
      margin: 0 0 10px;
    }
  }

  h5 {
    font-size: 15px;
    line-height: 2.33;
    font-weight: 400;
    color: ${rgba('#02073e', 0.6)};
  }
`;

export const BarArea = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 23px;
  @media only screen and (max-width: 991px) {
    margin-bottom: 20px;
  }

  &::before,
  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: ${themeGet('colors.lightGray', '#f0f0f0')};
    position: absolute;
    bottom: -7px;
    left: 0;
  }

  &::after {
    width: 56%;
    background-color: ${themeGet('colors.primary')};
  }

  .last-donate-time {
    line-height: 30px;
    color: ${rgba('#02073E', 0.5)};
    @media only screen and (max-width: 480px) {
      display: none;
    }
  }
`;

export const CurrentStatus = styled.p`
  color: ${themeGet('colors.textPrimary')};
  font-size: 17px;
  line-height: 1.48;
  strong {
    color: ${themeGet('colors.textPrimary')};
    font-weight: 500;
    font-size: 30px;
    line-height: 25px;
    @media only screen and (max-width: 1024px) {
      font-size: 26px;
    }
  }
`;

export const ShareArea = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  @media only screen and (max-width: 1366px) {
    margin-top: 30px;
  }
  @media only screen and (max-width: 1200px) {
    margin-top: 20px;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 30px;
    justify-content: center;
  }
`;

export const DonateButton = styled(AnchorLink)`
  align-items: center;
  background-color: ${themeGet('colors.primary')};
  border: 0;
  border-radius: 5px;
  color: ${themeGet('colors.white')};
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  min-height: 55px;
  padding: 0 30px;
  position: relative;
  margin-right: 20px;
  @media only screen and (max-width: 768px) {
    min-height: 50px;
    font-size: 14px;
    padding: 0 28px;
  }

  img {
    margin-left: 13px;
  }

  &:hover {
    &::before {
      left: 0;
      opacity: 0.8;
      visibility: visible;
    }
  }
`;

export const ShareList = styled.ul`
  display: flex;
  align-items: center;
  .share-label {
    color: ${rgba('#02073E', 0.6)};
    font-size: 16px;
  }
`;

export const Item = styled.li`
  color: ${themeGet('colors.heading', '#060F1E')};
  font-weight: 400;
  margin-right: 14px;
  &:last-child {
    margin-right: 0;
  }

  .twitter {
    svg {
      fill: ${themeGet('colors.twitter', '#55ACEE')};
    }
  }
  .facebook {
    svg {
      fill: ${themeGet('colors.facebook', '#0370C4')};
    }
  }
`;

export const Illustration = styled.div`
  position: absolute;
  right: 0;
  bottom: 80px;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 1024px) {
    bottom: 50px;
  }
  @media only screen and (max-width: 768px) {
    position: static;
    padding: 0 30px;
    margin-bottom: 50px;
  }
  img {
    @media only screen and (max-width: 1366px) {
      max-width: 88.5%;
    }
    @media only screen and (max-width: 1200px) {
      max-width: 81%;
    }
    @media only screen and (max-width: 1024px) {
      max-width: 69%;
    }
    @media only screen and (max-width: 768px) {
      max-width: 70%;
      margin: 0 auto;
    }
    @media only screen and (max-width: 480px) {
      max-width: 100%;
      margin: 0 auto;
    }
  }
`;

export default SectionWrapper;

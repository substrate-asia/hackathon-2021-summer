import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { rgba } from 'polished';

const SectionWrapper = styled.section`
  padding: 55px 0 100px;
  overflow: hidden;
  @media only screen and (max-width: 991px) {
    padding: 85px 0 100px;
  }
  @media only screen and (max-width: 624px) {
    padding: 75px 0 80px;
  }
  .container {
    @media only screen and (min-width: 1367px) {
      max-width: 1290px;
    }
  }
`;

export const TestimonialWrapper = styled.div`
  padding-top: 10px;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: -25px;
  @media only screen and (max-width: 991px) {
    padding-top: 0px;
  }
  .masonryGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;

export const TestimonialItem = styled.div`
  width: calc(100% / 3);
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 25px;
  @media only screen and (max-width: 991px) {
    width: calc(100% / 2);
  }
  @media only screen and (max-width: 624px) {
    width: 100%;
  }
`;

export const TestimonialItemInner = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 27px;
  box-shadow: 0px 0px 0px 2px ${themeGet('colors.borderColorTwo', '#EAE9F2')};
  transition: ease-in 0.25s;
  @media only screen and (max-width: 1199px) {
    padding-left: 25px;
    padding-right: 25px;
  }
  @media only screen and (max-width: 480px) {
    padding: 25px 20px;
  }
  &:hover {
    box-shadow: ${rgba('#5B84C1', 0.1)} 0px 15px 50px;
  }
  p {
    color: ${themeGet('colors.textColor', '#343D48')};
    font-size: 16px;
    line-height: 30px;
    letter-spacing: -0.3px;
    > span {
      color: ${themeGet('colors.twitterColor', '#6937F6')};
      font-weight: 500;
    }
  }
`;

export const TestimonialHead = styled.div`
  display: flex;
  margin-bottom: 23px;
  position: relative;
  padding-right: 20px;
  h3 {
    font-size: 18px;
    line-height: 26px;
    font-weight: 700;
    color: ${themeGet('colors.headingColor', '#19191B')};
    margin-bottom: 0px;
    margin-top: -7px;
  }
  p {
    color: ${themeGet('colors.secondary', '#696871')};
    font-size: 15px;
    line-height: 1.9;
    font-weight: 500;
    letter-spacing: -0.5px;
    @media only screen and (max-width: 480px) {
      font-size: 14px;
    }
  }
  a {
    color: ${themeGet('colors.twitterColor', '#6937F6')};
    transition: 0.15s ease-in-out;
    position: absolute;
    top: 0px;
    right: 0px;
    svg {
      width: 20px;
    }
    &:hover {
      color: #38a1f3;
    }
  }
`;
export const AuthorImage = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 13px;
  > img {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
`;
export default SectionWrapper;

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const TestimonialSectionWrapper = styled.section`
  padding: 80px 0 120px;
  overflow: hidden;
  @media (max-width: 990px) {
    padding-bottom: 80px;
  }
  @media (max-width: 767px) {
    padding-top: 40px;
  }

  .glide {
    max-width: 954px;
    margin: 0 auto;
    .glide__slide {
      display: flex;
      margin-bottom: 40px;
      @media only screen and (max-width: 991px) {
        padding-top: 30px;
      }
      @media only screen and (max-width: 680px) {
        flex-direction: column-reverse;
      }
    }
    .glide__controls {
      position: relative;
      bottom: 0;
      .reusecore__button {
        &:hover {
          color: ${themeGet('colors.quoteText', '#343d48')};
        }
      }
    }
  }
`;

const TextWrapper = styled.div`
  max-width: 540px;
  margin-right: auto;
  position: relative;
  padding-left: 12px;
  margin-right: 30px;

  p {
    text-indent: 27px;
    margin-bottom: 25px;
  }

  i {
    color: rgba(52, 61, 72, 0.2);
    font-size: 20px;
    position: absolute;
    top: 0;
    left: 12px;
    z-index: -1;
  }
`;

const ImageWrapper = styled.div`
  width: 256px;
  height: 256px;
  position: relative;
  @media only screen and (max-width: 680px) {
    margin-bottom: 40px;
  }
  .reusecore__button {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 20px;
    width: 65px;
    height: 65px;
    font-size: 26px;
    background-color: rgb(220, 57, 95);
    box-shadow: 0px 10px 28.2px 1.8px rgba(23, 65, 104, 0.2);
  }
`;

const RoundWrapper = styled.div`
  width: 256px;
  height: 256px;
  border-radius: 50%;
  box-sizing: border-box;
  border-bottom-right-radius: 10px;
  background: rgb(232, 230, 192);
  background: radial-gradient(
    circle,
    rgba(232, 230, 192, 1) 0%,
    rgba(199, 195, 134, 1) 100%
  );
  overflow: hidden;
`;

const ClientName = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 575px) {
    flex-direction: column;
    align-items: inherit;
  }
`;

export { TextWrapper, ImageWrapper, ClientName, RoundWrapper };

export default TestimonialSectionWrapper;

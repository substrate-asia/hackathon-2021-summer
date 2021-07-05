import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const TestimonialSectionWrapper = styled.section`
  margin: 80px 0 0;
  background-color: #f6f7fb;
  background: linear-gradient(transparent 50%, #f6f7fb);
  overflow: hidden;
  @media (max-width: 990px) {
    margin: 0px 0 0;
  }

  .glide {
    .glide__slides {
      align-items: flex-end;
    }
    max-width: 999px;
    margin-left: auto;
    .glide__slide {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @media only screen and (max-width: 991px) {
        padding-top: 30px;
      }
    }
    .glide__controls {
      .reusecore__button {
        &:hover {
          color: ${themeGet('colors.quoteText', '#343d48')};
        }
      }
    }
  }

  .glide__controls {
    @media (max-width: 767px) {
      width: 100%;
      left: 0;
      text-align: center;
    }
  }
`;

const TextWrapper = styled.div`
  max-width: 504px;
  margin-right: auto;
  align-self: flex-end;
  margin-bottom: 120px;
  position: relative;
  padding-left: 12px;
  @media (max-width: 767px) {
    text-align: center;
  }

  @media (max-width: 990px) and (min-width: 768px) {
    max-width: 300px;
  }

  i {
    color: rgba(52, 61, 72, 0.07);
    font-size: 70px;
    position: absolute;
    top: -40px;
    left: 0;
    z-index: -1;
  }
`;

const ImageWrapper = styled.div`
  flex-grow: 1;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export { TextWrapper, ImageWrapper };

export default TestimonialSectionWrapper;

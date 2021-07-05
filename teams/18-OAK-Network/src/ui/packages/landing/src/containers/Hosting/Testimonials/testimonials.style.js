import styled from 'styled-components';

const TestimonialSecWrapper = styled.section`
  padding: 80px 0;
  @media (max-width: 575px) {
    padding: 60px 0;
  }
  @media (max-width: 575px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  .glide {
    &:hover {
      .glide__prev--area,
      .glide__next--area {
        opacity: 1;
      }
    }
  }

  .glide__slides {
    padding-top: 10px;
    padding-bottom: 30px;

    .glide__slide {
      opacity: 0.5;
      pointer-events: none;
      transition: 0.25s ease;
      &.glide__slide--active {
        opacity: 1;
        pointer-events: auto;
        + .glide__slide {
          @media (min-width: 800px) {
            opacity: 1;
            pointer-events: auto;
          }
        }
      }
    }
  }

  .glide__controls {
    position: static;
    .glide__prev--area,
    .glide__next--area {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: 0.15s ease-in-out;
      @media (max-width: 990px) {
        display: none;
      }

      button {
        font-size: 28px;
      }
    }
    .glide__prev--area {
      left: 10%;
      @media (max-width: 1400px) {
        left: 5%;
      }
    }
    .glide__next--area {
      right: 10%;
      @media (max-width: 1400px) {
        right: 5%;
      }
    }
  }

  @media (max-width: 990px) {
    .glide__slide--active .testimonial_item {
      box-shadow: 5px 0px 20px rgba(0, 0, 0, 0.05);
    }
  }
`;

export const TestimonialItem = styled.div`
  border: 1px solid #f2f4f7;
  padding: 40px;
  border-radius: 5px;
  background-color: #fff;
  transition: 0.425s ease;

  &:hover {
    box-shadow: 0px 20px 40px -20px rgba(39, 79, 117, 0.25);
  }

  @media (max-width: 1300px) {
    padding: 30px;
  }
`;

export const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  flex-basis: 50px;
  display: block;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 6px 30px 0px rgba(39, 79, 117, 0.2);
  margin-right: 15px;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default TestimonialSecWrapper;

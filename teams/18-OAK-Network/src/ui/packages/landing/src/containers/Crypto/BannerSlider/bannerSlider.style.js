import styled from 'styled-components';

const TestimonialSecWrapper = styled.section`
  padding: 0;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 1;
  margin-top: -130px;
  @media (min-width: 1600px) {
    margin-top: -180px;
  }
  @media (max-width: 1200px) {
    margin-top: -80px;
  }
  @media (max-width: 990px) {
    margin-top: -40px;
  }
  @media (max-width: 575px) {
    padding: 60px 0;
  }
  @media (max-width: 575px) {
    padding-left: 15px;
    padding-right: 15px;
    padding: 60px 0 0;
  }
  .glide--carousel {
    display: flex;
    flex-direction: column;
    .glide__track {
      order: 2;
    }
    .glide__bullets {
      .glide__bullet {
        border-radius: 50%;
        background-color: rgb(20, 227, 186);
        opacity: 0.231;
        transition: all 0.2s ease;
        &.glide__bullet--active {
          background-color: rgb(20, 227, 186);
          width: 24px;
          height: 8px;
          border-radius: 15px;
          opacity: 1;
        }
      }
    }
    .glide__slide {
      p {
        @media (max-width: 480px) {
          margin-right: 30px;
          margin-left: 5px;
          max-width: 320px;
        }
      }
    }
  }
  .testimonial_item {
    max-width: 440px;
    @media (max-width: 480px) {
      max-width: 100%;
    }
  }
`;

export const TestimonialItem = styled.div`
  padding: 30px 0;
  background-color: #fff;
  transition: 0.425s ease;
  @media (max-width: 1300px) {
    padding: 20px 0;
  }
`;

export const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  flex-basis: 50px;
  display: block;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default TestimonialSecWrapper;

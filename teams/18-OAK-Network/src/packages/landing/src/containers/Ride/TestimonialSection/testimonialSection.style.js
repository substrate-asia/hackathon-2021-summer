import styled from 'styled-components';

const TestimonialSectionWrapper = styled.section`
  padding: 120px 0 120px;
  overflow: hidden;
  background: #fcfcfc;
  @media (max-width: 1440px) {
    padding: 80px 0 100px;
  }
  @media (max-width: 990px) {
    padding-bottom: 80px;
  }
  @media (max-width: 767px) {
    padding-top: 60px;
  }

  .glide {
    max-width: 954px;
    margin: 0 auto;
    .glide__slide {
      display: flex;
      margin-bottom: 40px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 991px) {
        padding-top: 30px;
      }
    }
    .glide__controls {
      position: relative;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -20px;
      margin-left: -25px;
      .reusecore__button {
        font-size: 18px;
        margin-right: 8px;
        &:hover {
          color: #017de3;
        }
      }
    }
  }
  .quote_image_area {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TextWrapper = styled.div`
  max-width: 1170px;
  margin-right: auto;
  position: relative;
  padding-top: 60px;
  @media (max-width: 1024px) {
    padding-top: 40px;
  }

  p {
    margin-bottom: 50px;
    font-size: 16px;
    font-family: 'Lato';
    line-height: 32px;
    color: #15172c;
    font-weight: 400;
    text-align: center;
    @media (max-width: 1024px) {
      margin-bottom: 35px;
    }
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
  width: 90px;
  height: 90px;
  position: relative;
`;

const RoundWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-sizing: border-box;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 10px 36px rgba(0, 0, 0, 0.12);
`;

const ClientName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 60px;
  @media only screen and (max-width: 1440px) {
    margin-top: 40px;
  }
  h3 {
    font-family: 'Poppins';
    font-size: 18px;
    font-weight: 600;
    line-height: 29px;
    color: #15172c;
  }
  h5 {
    font-family: 'Lato';
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    color: #15172c;
  }
`;

export { TextWrapper, ImageWrapper, ClientName, RoundWrapper };

export default TestimonialSectionWrapper;

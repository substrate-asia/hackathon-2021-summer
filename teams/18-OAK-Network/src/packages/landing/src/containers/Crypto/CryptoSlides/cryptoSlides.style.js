import styled from 'styled-components';

const FeatureSliderWrapper = styled.section`
  padding: 180px 0;
  @media (max-width: 1440px) {
    padding: 80px 0 120px;
  }
  @media (max-width: 480px) {
    padding: 80px 0 90px;
  }
  .FeatureSlider {
    position: relative;

    .image-gallery-slide-wrapper {
      .image-gallery-swipe {
        padding: 10px 15px 16px 19px;
        overflow: hidden;
        height: 100%;
        @media (max-width: 990px) {
          padding: 9px 6px 8px 6px;
        }
        .image-gallery-slides {
          height: 100%;
          border-radius: 20px;
          @media (max-width: 990px) {
            border-radius: 40px;
          }
          .image-gallery-image {
            img {
              height: 600px;
              object-fit: cover;
              @media (max-width: 768px) {
                height: auto;
              }
            }
          }
        }
      }
    }

    .image-gallery-bullets {
      bottom: auto;
      margin: 0;
      position: absolute;
      width: 100%;
      z-index: 4;
      top: auto;
      bottom: -60px;
      left: auto;
      display: flex;
      justify-content: center;
      align-items: center;

      .image-gallery-bullets-container {
        margin: 0;
        padding: 0;
        text-align: center;
        display: flex;
        flex-direction: row;
        .image-gallery-bullet {
          padding: 0;
          margin: 0;
          margin-right: 15px;
          transition: all 0.3s ease;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          top: 50%;
          left: 0;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
          z-index: 1;
          background: #fff;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            background: #f3f2fb;
            -webkit-transition: 0.25s ease-in-out;
            transition: 0.25s ease-in-out;
          }
          &.active {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
            background: #fff;
            width: 13px;
            height: 13px;
            &::after {
              background-color: #6150cc;
              width: 8px;
              height: 8px;
            }
          }
        }
      }
    }
    .image-gallery-thumbnails {
      display: none;
    }
  }
`;
export { FeatureSliderWrapper };

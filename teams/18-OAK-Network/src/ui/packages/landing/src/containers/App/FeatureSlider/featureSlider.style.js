import styled from 'styled-components';
import Mockup from 'common/assets/image/app/iphone-mockup.png';

const FeatureSliderWrapper = styled.div`
  position: relative;
  padding-top: 200px;
  @media (max-width: 1440px) {
    padding-top: 140px;
  }
  .FeatureSliderInner {
    span:nth-child(1) {
      position: absolute;
      display: block;
      width: 5%;
      padding-bottom: 5%;
      border-radius: 50%;
      top: 60%;
      left: 50%;
      opacity: 0;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      animation: pulsei 4.2s ease-out infinite;
      backface-visibility: hidden;
      pointer-events: none;
    }
    span:nth-child(2) {
      content: '';
      position: absolute;
      display: block;
      width: 5%;
      padding-bottom: 5%;
      border-radius: 50%;
      top: 60%;
      left: 50%;
      opacity: 0;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      animation: pulsei 4.2s ease-out infinite;
      backface-visibility: hidden;
      pointer-events: none;
      animation-delay: 1s;
    }
    span:nth-child(3) {
      content: '';
      position: absolute;
      display: block;
      width: 5%;
      padding-bottom: 5%;
      border-radius: 50%;
      top: 60%;
      left: 50%;
      opacity: 0;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      animation: pulsei 4.2s ease-out infinite;
      backface-visibility: hidden;
      pointer-events: none;
      animation-delay: 2s;
    }
  }
  .FeatureSlider {
    padding-top: 200px;
    padding-bottom: 100px;
    position: relative;

    .image-gallery {
      position: relative;
      z-index: 2;
    }
    @keyframes pulsei {
      0% {
        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
        border: 1px solid rgba(0, 0, 0, 0.5);
        opacity: 1;
        width: 5%;
        padding-bottom: 5%;
      }

      100% {
        transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
        opacity: 0;
        width: 67%;
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding-bottom: 67%;
      }
    }

    .image-gallery-slide-wrapper {
      width: 375px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      height: 759px;

      &::before {
        content: '';
        background-image: url(${Mockup});
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-repeat: no-repeat;
        background-size: contain;
      }
      &:after {
        content: '';
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 68px rgba(0, 0, 0, 1);
        display: block;
        position: absolute;
        border-radius: 50px;
      }
      .image-gallery-swipe {
        padding: 19px 24px 22px 23px;
        overflow: hidden;
        .image-gallery-slides {
          .image-gallery-slide {
            .image-gallery-image {
              max-height: calc(100% - 23px);
            }
          }
        }
      }
    }
    .image-gallery-thumbnails-wrapper {
      position: static;

      .image-gallery-thumbnails-container {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        left: 0;

        .image-gallery-thumbnail {
          border: 0;
          width: 125px;
          .image-gallery-thumbnail-inner {
            outline: none;
            &:focus {
              outline: none;
            }
          }
          img {
            transition: all 0.35s ease;
            width: 100px;
          }

          &:nth-child(1) {
            position: absolute;
            top: -80px;
            left: 16.666%;
          }
          &:nth-child(2) {
            position: absolute;
            top: -80px;
            right: 16.666%;
          }
          &:nth-child(3) {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }
          &:nth-child(4) {
            position: absolute;
            bottom: -120px;
            right: 16.666%;
          }
          &:nth-child(5) {
            position: absolute;
            bottom: -120px;
            left: 16.666%;
          }
          &:nth-child(6) {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
          .image-gallery-thumbnail-label {
            position: relative;
            margin-top: 10px;
            font-size: 19px;
            line-height: 24px;
            letter-spacing: -0.01em;
            color: #0f2137;
            font-family: 'Open sans';
            top: 0;
            text-shadow: none;
            transform: none;
            white-space: normal;
            width: 100%;
          }
          &.active {
            border: 0;
            .image-gallery-thumbnail-label {
              margin-top: 30px;
            }
            img {
              transition: all 0.35s ease;
              transform: scale(1.4);
              border: 0;
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
      top: 43%;
      right: -65px;
      left: auto;
      display: flex;
      justify-content: flex-end;
      .image-gallery-bullets-container {
        margin: 0;
        padding: 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        width: 32px;
        .image-gallery-bullet {
          appearance: none;
          border-radius: 70px;
          cursor: pointer;
          display: inline-block;
          outline: none;
          width: 19px;
          height: 4px;
          background: rgb(220, 226, 231);
          border: 0;
          box-shadow: none;
          padding: 0;
          margin: 0;
          margin-bottom: 10px;
          transition: all 0.3s ease;
          &.active {
            background-color: rgb(26, 115, 232);
            width: 32px;
            height: 4px;
          }
        }
      }
    }
  }
`;
export default FeatureSliderWrapper;

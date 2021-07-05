import styled from 'styled-components';

const LocationSelectorWrap = styled.section`
  .textArea {
    @media (max-width: 1024px) {
      padding-right: 30px;
    }
    @media (max-width: 768px) {
      padding-right: 30px;
    }
  }
  .locationSelector {
    width: 60%;
    box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    @media (max-width: 1600px) {
      width: 80%;
    }
    @media (max-width: 400px) {
      width: 100%;
    }
    .locationSelectorWrapper {
      position: relative;
      .locationColor {
        position: absolute;
        top: 53%;
        left: 20px;
        z-index: 1;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        z-index: 2;
        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 8px;
          height: 8px;
          box-shadow: 0 0 0 0.8px rgba(39, 170, 10, 1);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          opacity: 0;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          animation: pulse 2.2s ease-out infinite;
          backface-visibility: hidden;
          pointer-events: none;
          z-index: 11;
        }
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
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          background: #27aa0a;
          -webkit-transition: 0.25s ease-in-out;
          -webkit-transition: 0.25s ease-in-out;
          transition: 0.25s ease-in-out;
          z-index: 2;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
        }
        &.secondChild {
          &::before {
            box-shadow: 0 0 0 0.8px rgba(243, 46, 1, 1);
          }
          &::after {
            background: #f32e01;
          }
        }
      }
      &::after {
        content: '';
        position: absolute;
        height: calc(50% + 20px);
        width: 2px;
        left: 19px;
        top: 65%;
        z-index: 2;
        border: 1px dashed #e6e6e6;
      }
      &:nth-child(2) {
        &::after {
          content: none;
        }
      }
    }
    .field-wrapper {
      position: relative;
      &:first-child {
        &::before {
          content: '';
          position: absolute;
          width: calc(100% - 60px);
          height: 1px;
          background: #f3f3f5;
          bottom: -2px;
          left: 42px;
          right: 2px;
          z-index: 10;
          -webkit-transform-origin: right center 0;
          -ms-transform-origin: right center 0;
          transform-origin: right center 0;
          -webkit-transition: -webkit-transform 0.7s
            cubic-bezier(0.19, 1, 0.22, 1) 0s;
          -webkit-transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
        }
      }

      input {
        border: 0;
        padding: 20px 40px;
        z-index: 1;
        font-family: 'Lato';
        font-size: 16px;
        color: #15172c;
        &:placeholder {
          font-family: 'Lato';
          font-size: 16px;
          color: #15172c;
        }
      }
      .input-icon {
        position: absolute;
        top: 9px !important;
        left: auto !important;
        right: 5px !important;
        bottom: auto;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        z-index: 2;
        svg {
          width: 18px;
          height: 18px;
          fill: #e6e6e6;
        }
      }
    }
  }

  @keyframes pulse {
    0% {
      transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(-50%) translateY(-50%) translateZ(0) scale(2.5);
      opacity: 0;
    }
  }
  .derviceSelector {
    display: flex;
    margin-top: 50px;

    .deviceSelectorWrapper {
      display: flex;
      background: #f7f7f7;
      border-radius: 4px;
      padding: 5px;
      margin-right: 15px;
      .vejpaImage {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.5s ease;
        &.active-item {
          background: #fff;
          cursor: pointer;
          z-index: 1;
          border-radius: 4px;
          box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.08);
        }
        img {
          padding: 10px 24px;
          cursor: pointer;
          @media (max-width: 400px) {
            padding: 10px 11px;
          }
          @media (max-width: 360px) {
            padding: 10px 6px;
          }
        }
      }
      .carImage {
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: poiner;
        transition: all 0.5s ease;
        media(max-width: 400px) {
          margin-left: 5px;
        }
        @media (max-width: 360px) {
          margin-left: 0px;
        }
        &.active-item {
          background: #fff;
          cursor: poiner;
          z-index: 1;
          border-radius: 4px;
          box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.08);
        }
        img {
          padding: 10px 24px;
          cursor: pointer;
          @media (max-width: 400px) {
            padding: 10px 11px;
          }
          @media (max-width: 360px) {
            padding: 10px 6px;
          }
        }
      }
    }
    .derviceSelectorBtn {
      button {
        > span {
          font-weight: 700;
        }
        &:hover {
          box-shadow: 0px 9px 21px rgba(131, 84, 255, 0.25);
        }
      }
      .btn-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2px;
        margin-left: 10px;
      }
    }
  }
`;

export { LocationSelectorWrap };

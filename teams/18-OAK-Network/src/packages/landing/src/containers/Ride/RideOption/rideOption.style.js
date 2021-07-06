import styled from 'styled-components';

const OptionWrapper = styled.section`
  .container {
    @media (max-width: 480px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  .rider_image_area {
    width: 50%;
    @media (max-width: 550px) {
      display: none;
    }
  }
  .driver_image_area {
    width: 50%;
    @media (max-width: 550px) {
      display: none;
    }
  }
  .desTitleWrapper {
    width: 50%;
    transition: all 0.5s;
    @media (max-width: 550px) {
      width: 100%;
    }
    .desTitle {
      position: relative;
      transition: 0.35s ease-in-out;
      z-index: 1;
      &:before {
        content: '';
        position: absolute;
        width: calc(100% + 4px);
        height: 9px;
        background: #c2c7fb;
        bottom: 7px;
        left: -4px;
        z-index: -1;
        transform-origin: right center 0;
        transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
      }
    }

    .desOnHover {
      text-align: right;
    }
    .buttonStyle {
      .reusecore__button {
        background-color: transparent;
        > span {
          background-color: transparent;
          padding: 0;
          position: relative;
          @media (max-width: 700px) {
            font-size: 14px;
          }
          &:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            background: #15172c;
            bottom: 1px;
            left: 0px;
            z-index: -1;
            transform-origin: right center 0;
            transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
          }
        }
      }
      &.signupBtn {
        .reusecore__button {
          margin-top: 75px;
          @media (max-width: 768px) {
            margin-top: 45px;
          }
          > span {
            &:after {
              content: none;
            }
          }
        }
      }
    }
  }
  .desTitleWrapperLeft {
    align-items: flex-start;
    .desOnHoverLeft {
      text-align: left;
    }
  }
  .riderBlock,
  .driverBlock {
    cursor: pointer;
    transition: all 0.5s ease;
    overflow: hidden;
    .desTitleWrapper {
      transform: translateY(50%);
      transition: all 0.5s;
    }

    @media (max-width: 550px) {
      padding: 15px;
    }
    @media (max-width: 480px) {
      background: #faf8ff;
      margin-bottom: 15px;
      margin-left: 0 !important;
      padding: 20px;
      border-radius: 5px;
    }
    .desOnHover {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      opacity: 0;
      visibility: hidden;
      @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
        background: #faf8ff;
      }
    }
    &.active-item {
      background: #faf8ff;
      .desTitleWrapper {
        transform: translateY(0%);
      }
      @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
      }
      .desOnHover {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        opacity: 1;
        visibility: visible;
      }
    }
    .desDetailsFirst {
      margin-top: 65px;
      line-height: 32px;
      @media (max-width: 768px) {
        line-height: 22px;
        margin-top: 30px;
      }
    }
  }
  .driverBlock {
    margin-left: 10px;
    width: 48%;
    @media (max-width: 1440px) {
      width: 47%;
    }
    @media (max-width: 480px) {
      width: 100%;
    }
  }
  .riderBlock {
    width: calc(48% + 10px);
    @media (max-width: 1440px) {
      width: calc(48% + 10px);
    }
    @media (max-width: 480px) {
      width: 100%;
      margin-top: 15px;
    }
  }
`;

export { OptionWrapper };

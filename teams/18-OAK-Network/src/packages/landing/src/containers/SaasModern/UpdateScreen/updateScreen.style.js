import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 100px 0 0 0;
  background: linear-gradient(
    35deg,
    rgb(147, 249, 185) 0%,
    rgb(29, 151, 108) 100%
  );
  @media (max-width: 990px) {
    padding: 80px 0 0 0;
  }
  @media (max-width: 575px) {
    padding: 60px 0 0 0;
  }

  @keyframes ScaleInUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .update-screen-tab {
    border: 0;
    overflow: initial;
    .rc-tabs-ink-bar {
      display: none !important;
    }
    .rc-tabs-bar {
      border: 0;
    }
    .rc-tabs-nav-container,
    .rc-tabs-nav-wrap {
      margin-bottom: 40px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      &:not(.rc-tabs-nav-container-scrolling) {
        .rc-tabs-nav-scroll,
        .rc-tabs-nav-list {
          width: 100%;
          text-align: center;
          justify-content: center;
          @media (max-width: 767px) {
            flex-wrap: wrap;
          }
          .rc-tabs-nav {
            float: none;
            display: block;
            .rc-tabs-tab {
              display: inline-block;
              float: none;
            }
          }
        }
      }
      .rc-tabs-tab {
        font-size: 18px;
        color: #dcf4e8;
        font-weight: 400;
        min-width: 230px;
        padding: 0 0 27px 0;
        text-align: center;
        margin-right: 20px;
        transition: 0.25s ease-in-out;
        background: transparent;
        justify-content: center;
        &:hover {
          color: #fff;
        }
        &:last-child {
          margin-right: 0;
        }
        &:before,
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          display: block;
          @media (max-width: 767px) {
            display: none;
          }
        }
        &:before {
          background: rgba(0, 0, 0, 0.08);
        }
        &:after {
          background: #fff;
          transform: scaleX(0);
          transform-origin: right center 0;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
        }
        &.rc-tabs-tab-active {
          color: #fff;
          &:after {
            transform: scaleX(1);
            transform-origin: left center 0;
            transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
          }
        }
        > div {
          margin-right: 8px;
          i {
            margin-right: 5px;
            @media (max-width: 767px) {
              margin-right: 7px;
            }
          }
        }
        @media (max-width: 1199px) {
          font-size: 16px;
          padding: 0 0 20px 0;
          min-width: 170px;
        }
        @media (max-width: 990px) {
          min-width: auto;
          padding: 0 10px 15px 10px;
        }
        @media (max-width: 767px) {
          font-size: 14px;
          padding: 0;
          max-width: 50%;
          svg {
            width: 20px;
          }
        }
      }
    }
    .rc-tabs-content {
      .rc-tabs-tabpane {
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 5px 60px 0px rgba(27, 67, 111, 0.15);
        &.rc-tabs-tabpane-active {
          animation: 0.7s ScaleInUp;
        }
        > img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      }
    }
  }

  .rc-tabs-nav-operations {
    display: none;
  }
`;

export default SectionWrapper;

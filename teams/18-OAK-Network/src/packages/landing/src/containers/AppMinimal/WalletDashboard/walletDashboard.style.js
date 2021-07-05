import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 160px 0 40px 0;
  @media (max-width: 1199px) {
    padding: 80px 0 40px 0;
  }
  @media (max-width: 575px) {
    padding: 60px 0 20px 0;
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
      margin-bottom: 45px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      @media (max-width: 1199px) {
        margin-bottom: 30px;
      }
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: #e7e8eb;
        display: block;
        left: 0;
        bottom: 0;
        z-index: -1;
      }
      &:not(.rc-tabs-nav-container-scrolling) {
        .rc-tabs-nav-scroll,
        .rc-tabs-nav-list {
          width: 100%;
          text-align: center;
          justify-content: center;
          @media (max-width: 991px) {
            flex-wrap: wrap;
            justify-content: flex-start;
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
        font-size: 17px;
        color: #0f2137;
        font-weight: 400;
        min-width: 310px;
        padding: 0 0 25px 0;
        text-align: left;
        margin-right: 0;
        transition: 0.25s ease-in-out;
        align-items: center;
        @media (max-width: 1600px) {
          min-width: 270px;
        }
        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          display: block;
          @media (max-width: 1199px) {
            display: none;
          }
        }
        &:after {
          background: #1089ff;
          transform: scaleX(0);
          transform-origin: right center 0;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
        }
        h3 {
          font-weight: bold;
          font-size: 19px;
          color: #0f2137;
          margin-bottom: 15px;
          line-height: 1;
        }
        &.rc-tabs-tab-active {
          &:after {
            transform: scaleX(1);
            transform-origin: left center 0;
            transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
          }
        }
        > div {
          margin-right: 8px;
        }
        @media (max-width: 1199px) {
          font-size: 16px;
          padding: 0 0 20px 0;
          min-width: 170px;
        }
        @media (max-width: 991px) {
          min-width: auto;
          padding: 0 20px 15px 20px;
          width: 50%;
        }
        @media (max-width: 1199px) {
          font-size: 14px;
          svg {
            width: 20px;
          }
        }
      }
    }
    .rc-tabs-content {
      .rc-tabs-tabpane {
        overflow: hidden;
        background: #e2f1ea;
        border-radius: 6px;
        padding-top: 60px;
        padding-bottom: 0px;
        &.rc-tabs-tabpane-active {
          animation: 0.7s ScaleInUp;
        }
        > img {
          max-width: 100%;
          height: auto;
          display: block;
          margin-left: auto;
          margin-right: auto;
          @media (max-width: 768px) {
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
    }
  }

  /* .rc-tabs-tab-prev-icon,
  .rc-tabs-tab-next-icon {
    font-size: 20px;
    color: #1089ff;
    line-height: 1;
    display: block;
  } */
  .rc-tabs-nav-operations {
    display: none;
  }
`;

export default SectionWrapper;

import styled from 'styled-components';

export const PortfolioShowcaseWrapper = styled.div`
  @keyframes FadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .glide__controls {
    position: absolute;
    bottom: -12px;
    right: 0;
    @media (max-width: 990px) {
      bottom: 23px;
    }
    @media (max-width: 575px) {
      top: -50px;
      right: 50%;
      bottom: auto;
      transform: translateX(50%);
    }
  }

  .rc-tabs-bar,
  .rc-tabs-nav {
    border: none !important;
    margin-bottom: 80px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.5;
    white-space: nowrap;
    outline: none;
    zoom: 1;
    -webkit-transition: padding 0.45s;
    transition: padding 0.45s;
    @media (max-width: 1440px) {
      margin-bottom: 60px;
    }
    @media (max-width: 990px) {
      margin-bottom: 45px;
    }
    @media (max-width: 575px) {
      margin-bottom: 65px;
    }
    &:focus,
    *:focus {
      outline: none;
    }
    .rc-tabs-nav-wrap {
      .rc-tabs-nav-list {
        @media (max-width: 991px) {
          flex-wrap: wrap;
          display: flex;
        }
        .rc-tabs-tab {
          font-size: 16px;
          font-weight: 700;
          font-family: 'Raleway', sans-serif;
          color: #43414e;
          display: inline-block;
          margin-right: 40px;
          cursor: pointer;
          box-sizing: border-box;
          position: relative;
          -webkit-transition: color 0.3s cubic-bezier(0.35, 0, 0.25, 1);
          transition: color 0.3s cubic-bezier(0.35, 0, 0.25, 1);
          padding: 8px 20px;
          font-weight: 600;
          cursor: pointer;
          @media (max-width: 991px) {
            font-size: 15px;
            margin-right: 35px;
            padding-bottom: 20px;
            width: 40%;
          }
          @media (max-width: 575px) {
            margin-right: 20px;
            font-size: 14px;
          }
          &:last-child {
            margin-right: 0;
          }
          &.rc-tabs-tab-active {
            > div {
              color: #3444f1;
              &:before {
                width: 100%;
              }
            }
          }
          &:hover {
            > div {
              color: #3444f1;
              &:before {
                width: 100%;
              }
            }
          }
          > div {
            position: relative;
            display: block;
            margin: 0;
            overflow: hidden;

            &:before {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              color: #3444f1;
              overflow: hidden;
              white-space: nowrap;
              transition: 0.5s ease-in-out;
            }
          }
        }
      }
    }
  }

  .rc-tabs-content {
    .rc-tabs-tabpane {
      display: none;
      overflow: initial;

      &.rc-tabs-tabpane-active {
        display: block;
        animation: 0.7s FadeInUp;
      }
    }
  }

  .rc-tabs-ink-bar {
    display: none !important;
  }

  .rc-tabs-top {
    border: none;
  }
  .rc-tabs-nav-operations {
    display: none;
  }
`;

export const PortfolioShowcaseItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const PortfolioLink = styled.div`
  margin-bottom: 36px;
  @media (max-width: 990px) {
    margin-bottom: 25px;
  }
  @media (max-width: 575px) {
    margin-bottom: 15px;
  }
  a {
    font-size: 16px;
    font-weight: 700;
    font-family: 'Raleway', sans-serif;
    color: #3444f1;
    position: relative;
    padding: 0 0 2px 8px;
    @media (max-width: 990px) {
      font-size: 15px;
    }
    @media (max-width: 575px) {
      font-size: 14px;
    }
    &:before,
    &:after {
      content: '';
      display: block;
      width: 58px;
      height: 15px;
      position: absolute;
      background: #eaecfe;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
    &:after {
      background: #c2c7fb;
      transform: scaleX(0);
      transform-origin: right center 0;
      transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
    }
    &:hover {
      &:after {
        transform: scaleX(1);
        transform-origin: left center 0;
        transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
      }
    }
  }
`;

export const BuiltWith = styled.div`
  margin-top: 60px;
  @media (max-width: 990px) {
    margin-top: 30px;
  }
  > span {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: #3444f1;
    font-family: 'Raleway', sans-serif;
    padding: 5px 22px;
    position: relative;
    @media (max-width: 990px) {
      font-size: 14px;
      padding: 5px 10px;
    }
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
      &:after {
        display: none;
      }
    }
    &:after {
      content: '|';
      position: absolute;
      display: block;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
`;

export const PortfolioMeta = styled.div`
  flex: 0 0 100%;
  max-width: calc(100% - 200px);
  margin-top: 70px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 990px) {
    margin-top: 50px;
    max-width: calc(100% - 100px);
  }
  @media (max-width: 575px) {
    margin-top: 30px;
    max-width: 100%;
    margin-bottom: 15px;
  }
`;

export const MetaItem = styled.span`
  margin-right: 45px;
  font-size: 16px;
  color: #43414e;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  @media (max-width: 990px) {
    font-size: 14px;
    margin-right: 25px;
  }
  @media (max-width: 767px) {
    padding-bottom: 10px;
  }
  &:last-child {
    margin-right: 0;
  }

  &.meta_featured {
    font-weight: 500;
    margin-right: 70px;
    @media (max-width: 990px) {
      margin-right: 40px;
    }
    @media (max-width: 575px) {
      width: 100%;
      margin-bottom: 5px;
    }
    > a {
      margin-left: 0.4em;
    }
  }
  > a {
    color: #3444f1;
    font-weight: 700;
  }
  > b {
    font-family: 'roboto', sans-serif;
    margin-right: 5px;
  }
`;

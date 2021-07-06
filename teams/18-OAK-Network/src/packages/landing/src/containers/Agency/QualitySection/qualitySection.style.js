import styled from 'styled-components';

const QualitySectionWrapper = styled.section`
  padding: 110px 0 60px;
  min-height: 600px;
  overflow: hidden;

  @media (max-width: 990px) {
    padding: 0 0 30px;
  }

  @media only screen and (min-width: 1366px) {
    min-height: 895px;
  }

  .info-sec-container {
    width: 100%;
    max-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    @media only screen and (max-width: 991px) {
      display: none;
    }
  }

  .feature__block {
    margin: 15px 0;
    .icon__wrapper {
      flex-shrink: 0;
      position: relative;
      background: linear-gradient(
        -60deg,
        rgba(241, 39, 17, 0.8),
        rgba(245, 175, 25, 0.8)
      );
      .flaticon-flask {
        &:before {
          margin-left: 6px;
        }
      }
      &:before,
      &:after {
        content: '';
        width: 24px;
        height: 100%;
        position: absolute;
      }
      &:before {
        transform: rotate(45deg);
        background-color: rgba(255, 255, 255, 0.15);
      }
      &:after {
        transform: rotate(-45deg);
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .row {
    > .col {
      &:nth-child(2) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(50, 207, 167, 0.9),
              rgba(150, 201, 61, 0.9)
            );
          }
        }
      }
      &:nth-child(3) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(236, 0, 140, 0.85),
              rgba(255, 103, 103, 0.85)
            );
          }
        }
      }
      &:nth-child(4) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(47, 128, 237, 0.85),
              rgba(86, 204, 242, 0.85)
            );
          }
        }
      }
      &:nth-child(5) {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(0, 57, 115, 0.85),
              rgba(299, 299, 199, 0.85)
            );
          }
        }
      }
      &:last-child {
        .feature__block {
          .icon__wrapper {
            background: linear-gradient(
              -60deg,
              rgba(110, 72, 170, 0.85),
              rgba(192, 91, 210, 0.85)
            );
          }
        }
      }
    }
  }
`;

export default QualitySectionWrapper;

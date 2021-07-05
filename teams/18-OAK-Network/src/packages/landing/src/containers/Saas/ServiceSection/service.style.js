import styled from 'styled-components';

const ServiceSectionWrapper = styled.section`
  padding: 80px 0 40px;
  @media (max-width: 990px) {
    padding: 60px 0 0 0;
  }

  .feature__block {
    position: relative;
    height: 100%;
    transition: box-shadow 0.3s ease;
    display: flex;
    @media (max-width: 500px) {
      padding: 30px 0;
    }
    .icon__wrapper {
      position: relative;
      border-bottom-right-radius: 6px;
      flex-shrink: 0;
      margin-right: 22px;
      background: #fff5f6;
      .flaticon-flask {
        &:before {
          margin-left: 8px;
        }
      }
    }
    &:hover {
      ${'' /* box-shadow: 0 40px 90px -30px rgba(39, 79, 117, 0.2); */}
    }
  }

  .row {
    > .col {
      &:nth-child(-n + 3) {
      }

      &:nth-child(3n + 3),
      &:last-child {
      }
      &:nth-child(1) {
        .feature__block {
          .icon__wrapper {
            background: #fff5f6;
            color: #f55767;
          }
        }
      }

      &:nth-child(2) {
        .feature__block {
          .icon__wrapper {
            background: #ebfff2;
            color: #29c05e;
          }
        }
      }
      &:nth-child(3) {
        .feature__block {
          .icon__wrapper {
            background: #f1faff;
            color: #2595d4;
          }
        }
      }
      &:nth-child(4) {
        .feature__block {
          .icon__wrapper {
            background: #fffae8;
            color: #e9b600;
          }
        }
      }
      &:nth-child(5) {
        .feature__block {
          .icon__wrapper {
            background: #f5eeff;
            color: #a55cef;
          }
        }
      }
      &:nth-child(6) {
        .feature__block {
          .icon__wrapper {
            background: #ffecfa;
            color: #e764a5;
          }
        }
      }
    }
  }
`;

export default ServiceSectionWrapper;

import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 75px 0 0 0;

  .service_item {
    position: relative;
    text-align: center;
    .service_icon {
      width: 110px;
      height: 110px;
      border-radius: 35px;
      background-color: #ffecef;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      margin: 0 auto 28px auto;
      color: #ff4361;
      @media (max-width: 990px) {
        width: 90px;
        height: 90px;
        border-radius: 25px;
        font-size: 36px;
        margin-bottom: 20px;
      }
    }
  }

  .service_item_col {
    &:nth-child(1) {
      .service_item {
        .service_icon {
          font-size: 56px;
          @media (max-width: 990px) {
            font-size: 48px;
          }
        }
      }
    }

    &:nth-child(2) {
      .service_item {
        .service_icon {
          background-color: #eaf9ff;
          color: #45b1e1;
          font-size: 46px;
          @media (max-width: 990px) {
            font-size: 40px;
          }
        }
        h3 {
          color: #45b1e1;
        }
      }
    }

    &:nth-child(3) {
      .service_item {
        .service_icon {
          background-color: #fff6d3;
          color: #d6ab00;
          font-size: 46px;
          @media (max-width: 990px) {
            font-size: 40px;
          }
        }
        h3 {
          color: #d6ab00;
        }
      }
    }

    &:nth-child(4) {
      .service_item {
        .service_icon {
          background-color: #e4ffee;
          color: #40975f;
          font-size: 46px;
          @media (max-width: 990px) {
            font-size: 40px;
          }
          i {
            height: 36px;
          }
        }
        h3 {
          color: #40975f;
        }
      }
    }

    &:nth-child(5) {
      .service_item {
        .service_icon {
          background-color: #f4f4ff;
          color: #5856d6;
          font-size: 32px;
          @media (max-width: 990px) {
            font-size: 28px;
          }
        }
        h3 {
          color: #5856d6;
        }
      }
    }
  }
`;

export default SectionWrapper;

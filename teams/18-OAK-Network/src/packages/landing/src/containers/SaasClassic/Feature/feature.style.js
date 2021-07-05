import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 100px 0 80px 0;
  @media (max-width: 990px) {
    padding: 80px 0 60px 0;
  }
  @media (max-width: 575px) {
    padding: 60px 0 20px 0;
  }

  .feature_col {
    &:nth-child(2) {
      .icon__wrapper {
        background-color: #eaf9ff;
        color: #54b5e2;
        font-size: 40px;
      }
    }

    &:nth-child(3) {
      .icon__wrapper {
        background-color: #fff6d3;
        color: #d6ac02;
        font-size: 32px;
      }
    }

    &:nth-child(4) {
      .icon__wrapper {
        background-color: #e4ffee;
        color: #40975f;
        font-size: 36px;
      }
    }

    &:nth-child(5) {
      .icon__wrapper {
        background-color: #f4f4ff;
        color: #5856d6;
        font-size: 40px;
      }
    }

    &:nth-child(6) {
      .icon__wrapper {
        background-color: #fceee4;
        color: #ea7a2f;
        font-size: 38px;
      }
    }
  }
`;

export default SectionWrapper;

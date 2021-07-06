import styled from 'styled-components';

export const FeatureSectionWrapper = styled.section`
  position: relative;
  padding-bottom: 60px;
  @media (max-width: 767px) {
    padding-bottom: 20px;
  }
  .container {
    max-width: 1200px;
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-left: -30px;
      margin-right: -30px;
      @media (max-width: 767px) {
        margin-left: -20px;
        margin-right: -20px;
      }
    }
  }

  .featureSingle {
    flex: 1 1 33.333%;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 50px;

    @media (max-width: 767px) {
      padding-left: 20px;
      padding-right: 20px;
    }

    @media (max-width: 575px) {
      flex: 1 1 100%;
    }
    &Inner {
      position: relative;
      padding-left: 50px;
      > img {
        position: absolute;
        top: 0;
        left: 0;
      }
      h3 {
        margin: 0;
        font-style: normal;
        font-weight: bold;
        font-size: 17px;
        line-height: 30px;
        letter-spacing: -0.01em;
        color: #0f2137;
      }
      p {
        margin: 0;
        font-family: DM Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 24px;
        color: #0f2137;
        opacity: 0.8;
        margin-top: 15px;
      }
    }
  }
`;

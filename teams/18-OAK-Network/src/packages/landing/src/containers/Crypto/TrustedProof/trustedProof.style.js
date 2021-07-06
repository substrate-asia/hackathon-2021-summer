import styled from 'styled-components';

const TrustedWrapper = styled.section`
  padding: 180px 0 150px;
  @media (max-width: 1440px) {
    padding: 150px 0 50px;
  }
  @media (max-width: 480px) {
    padding: 110px 0 30px;
  }
  .colleft {
    width: 40%;
    @media (max-width: 1199px) {
      width: 100%;
    }
    .TrustedImageBtn {
      display: flex;
      img {
        width: 150px;
        height: 47px;
      }
      .app_image_area {
        margin-right: 20px;
      }
    }
  }
  .colright {
    width: calc(60% - 100px);
    margin-left: 100px;
    @media (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      margin-top: 100px;
    }
  }
`;

const FeatureSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .featureWrapper {
    max-width: 280px;
    margin-bottom: 45px;
    display: flex;
    @media (max-width: 599px) {
      max-width: 100%;
    }
    img {
      width: 50px;
      height: 50px;
      object-fit: contain;
      margin-bottom: 20px;
      border-width: 2px;
      border-color: rgb(233, 227, 254);
      border-radius: 10px;
      background-color: rgb(243, 242, 250);
      padding: 8px 10px;
    }
    .contextPortion {
      margin-left: 15px;
    }
  }
`;
export { TrustedWrapper, FeatureSection };

import styled from 'styled-components';

const ScalableWrapper = styled.section`
  padding: 50px 0 0px;
  .colleft {
    width: calc(50% - 70px);
    margin-right: 70px;
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
    width: 50%;
    @media (max-width: 1199px) {
      width: 100%;
      margin-left: 0;
      margin-top: 100px;
    }
    @media (max-width: 480px) {
      width: 100%;
      margin-left: 0;
      margin-top: 40px;
    }
    img {
      height: 100%;
      width: 100%;
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
export { ScalableWrapper, FeatureSection };

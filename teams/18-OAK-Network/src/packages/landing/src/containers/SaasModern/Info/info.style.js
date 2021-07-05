import styled from 'styled-components';
import BgImage from 'common/assets/image/saasModern/dash-bg.png';

const InfoSectionWrapper = styled.section`
  padding: 380px 0 250px 0;
  @media (max-width: 1600px) {
    padding: 280px 0 200px 0;
  }
  @media (max-width: 1400px) {
    padding: 180px 0 180px 0;
  }
  @media (max-width: 1300px) {
    padding: 150px 0 150px 0;
  }
  @media (max-width: 1199px) {
    padding: 100px 0 100px 0;
  }
  @media (max-width: 767px) {
    padding: 30px 0 60px 0;
  }
  .info-sec-container {
    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
    @media (max-width: 768px) and (min-width: 768px) {
      top: 40%;
    }
    @media (max-width: 767px) {
      padding-bottom: 40px;
    }

    .image_area {
      background-image: url(${BgImage});
      background-position: bottom left;
      background-size: contain;
      background-repeat: no-repeat;
      padding: 50px 0 60px 0;
      @media (max-width: 767px) {
        padding-top: 0;
      }
    }
  }
`;

export default InfoSectionWrapper;

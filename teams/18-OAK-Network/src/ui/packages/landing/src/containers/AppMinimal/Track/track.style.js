import styled from 'styled-components';

const TrackArea = styled.section`
  padding-top: 100px;
  padding-bottom: 0px;
  @media (max-width: 1600px) {
    padding-top: 50px;
    padding-bottom: 70px;
  }
  @media (max-width: 575px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 2;
    color: #0f2137;
    margin-bottom: 0;
    @media (max-width: 1600px) {
      font-size: 15px;
    }
    + p {
      margin-top: 30px;
    }
  }
  .Left {
    max-width: 485px;
    @media (max-width: 991px) {
      width: 100%;
      margin-bottom: 50px;
    }
    h2 {
      font-weight: 500;
      font-size: 40px;
      line-height: 1.37;
      letter-spacing: -0.02em;
      color: #0f2137;
      margin-bottom: 45px;
      @media (max-width: 1600px) {
        font-size: 32px;
        max-width: 441px;
      }
      @media (max-width: 575px) {
        font-size: 22px;
        max-width: 100%;
      }
    }
  }
  .TrackRow {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
  }
  .TrackCol {
    padding-left: 15px;
    padding-right: 15px;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .TrackBox {
    text-align: center;
    h3 {
      font-weight: 500;
      font-size: 24px;
      text-align: center;
      letter-spacing: -0.02em;
      color: #0f2137;
      line-height: 1;
      margin-bottom: 10px;
    }
    p {
      font-weight: normal;
      font-size: 14px;
      text-align: center;
      color: #0f2137;
      line-height: 1;
      margin-bottom: 0;
    }
  }
  .TrackImage {
    min-height: 95px;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -40px;
  margin-right: -40px;
`;
export const Col = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  flex: 0 0 50%;
  max-width: 50%;
  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export default TrackArea;

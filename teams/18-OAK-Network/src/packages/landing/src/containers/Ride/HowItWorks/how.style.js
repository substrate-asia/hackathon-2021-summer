import styled from 'styled-components';
import Background from 'common/assets/image/ride/how_it.svg';

const HowWrapper = styled.section`
  padding: 120px 0;
  background-image: url(${Background});
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 100% center;
  background-size: 850px;
  position: relative;
  justify-content: center;
  align-items: center;
  @media (max-width: 1750px) {
    background-position: 100% center;
    background-size: 780px;
  }
  @media (max-width: 1600px) {
    background-position: 100% center;
    background-size: 680px;
    height: 94vh;
  }
  @media (max-width: 1440px) {
    background-position: 100% center;
    background-size: 580px;
    height: 93vh;
    padding: 210px 0;
  }
  @media (max-width: 1280px) {
    background-position: 100% center;
    background-size: 580px;
    height: 100%;
    margin-bottom: 0px;
  }
  @media (max-width: 1024px) {
    background-position: 120% center;
    background-size: 580px;
    height: 100%;
    margin-bottom: 0px;
  }
  @media (max-width: 850px) {
    background-position: 100% center;
    background-size: 50%;
    height: 100%;
    margin-bottom: 0px;
    padding: 0;
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  margin-top: 25px;
  button {
    .btn-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2px;
      margin-left: 10px;
    }
    > span {
      font-weight: 700;
    }
    &:hover {
      box-shadow: 0px 9px 21px rgba(131, 84, 255, 0.25);
    }
  }
`;

export { HowWrapper, BtnWrapper };

import styled from 'styled-components';
import Background from 'common/assets/image/ride/background.png';

const BannerWrapper = styled.section`
  background-image: url(${Background});
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 105% center;
  background-size: 1020px;
  position: relative;
  margin-top: -40px;
  @media (max-width: 1750px) {
    background-size: 900px;
  }
  @media (max-width: 1600px) {
    background-position: 102% center;
    background-size: 800px;
    height: 94vh;
  }
  @media (max-width: 1440px) {
    background-position: 106% center;
    background-size: 700px;
    height: 93vh;
    background-size: contain;
    margin-top: 0;
  }
  @media (max-width: 1280px) {
    background-position: 102% center;
    background-size: contain;
    height: 100%;
    margin-bottom: 60px;
    margin-top: 0;
  }
  @media (max-width: 1024px) {
    background-position: 135% center;
    background-size: contain;
    height: 100%;
    margin-bottom: 60px;
    overflow: hidden;
  }
  @media (max-width: 990px) {
    background-position: 100% center;
    background-size: contain;
    height: 100%;
    margin-bottom: 0px;
    overflow: hidden;
    background-image: none;
    background: #faf8ff;
    padding-bottom: 100px;
  }
  @media (max-width: 480px) {
    padding-bottom: 70px;
  }
  .image_area {
    position: relative;
    img {
      padding-top: 390px;
      object-fit: cover;
      @media (max-width: 1750px) {
        padding-top: 310px;
      }
      @media (max-width: 1600px) {
        padding-top: 210px;
      }
      @media (max-width: 1440px) {
        height: 93%;
        padding-top: 150px;
      }
      @media (max-width: 1280px) {
        height: 100%;
        padding-top: 30px;
      }
      @media (max-width: 990px) {
        display: none;
      }
    }
    .man_image_area {
      margin-left: 30px;
      object-fit: contain;
      @media (max-width: 1750px) {
        margin-left: 10px;
      }
      @media (max-width: 1440px) {
        height: 93%;
        margin-left: 0px;
      }
      @media (max-width: 1280px) {
        margin-left: -20px;
        height: 65%;
      }
    }
    .car_image_area {
      margin-left: 180px;
      object-fit: contain;
      @media (max-width: 1440px) {
        height: 60%;
        padding-top: 30px;
        margin-left: 30px;
      }
    }
  }
  .bannerImageBtn {
    display: flex;
    margin-top: 5px;

    .app_image_area {
      margin-right: 15px;
    }
  }
  .contentArea {
    @media (max-width: 990px) {
      width: 100%;
    }
  }
  .container {
    @media (max-width: 480px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;
const EmailInputWrapper = styled.div`
  display: flex;
  margin-top: 25px;
  .reusecore__input {
    width: 55%;
    margin-right: 15px;
    .field-wrapper {
      input {
        height: 56px;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 7px 25px rgba(0, 0, 0, 0.08);
        border: 0;
        border-radius: 4px;
        color: #15172c;
        font-family: 'Lato';
        font-size: 16px;
        font-weight: 500;
        padding-left: 30px;
        @media (max-width: 480px) {
          height: 50px;
        }
        &:placeholder {
          color: #15172c;
          font-family: 'Lato';
          font-size: 16px;
          font-weight: 500;
          opacity: 1;
        }
      }
    }
  }
  button {
    @media (max-width: 480px) {
      height: 50px;
    }
    @media (max-width: 400px) {
      padding-left: 15px;
      padding-right: 15px;
    }
    > span {
      font-weight: 700;
    }
    &:hover {
      box-shadow: 0px 9px 21px rgba(131, 84, 255, 0.25);
    }
  }
`;

export { BannerWrapper, EmailInputWrapper };

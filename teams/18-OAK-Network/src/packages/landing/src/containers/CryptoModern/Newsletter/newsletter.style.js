import styled from 'styled-components';
import BannerBG from 'common/assets/image/cryptoModern/get-start.png';

const NewsletterWrapper = styled.div`
  position: relative;
  background-image: url(${BannerBG});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  z-index: 1;
  margin-top: 100px;
  @media (max-width: 1220px) {
    padding: 35px 40px;
  }
  @media (max-width: 990px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  @media (max-width: 575px) {
    padding: 35px 20px;
    margin-top: 50px;
  }

  .container {
    display: flex;
  }
`;

export const ContactFormWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 470px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1220px) {
    width: 420px;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
  @media (max-width: 575px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    button {
      width: 100%;
    }
  }

  .email_input {
    flex-grow: 1;
    margin-right: 20px;

    @media (max-width: 575px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
    &.is-material {
      &.is-focus {
        label {
          font-size: 14px;
          color: #fff;
        }
        .highlight {
          background: #fff;
          height: 1px;
        }
      }
    }

    .highlight {
      background: rgba(255, 255, 255, 0.4);
    }

    input {
      background: transparent;
      font-size: 17px;
      font-weight: 300;
      color: #fff;
      padding: 10px 15px;
      border-color: rgba(255, 255, 255, 0.3);
      @media (max-width: 575px) {
        height: 48px;
      }
    }

    label {
      font-size: 17px;
      color: #fff;
      font-weight: 400;
      padding-left: 10px;
      top: 5px;
      pointer-events: none;
    }
  }
  .reusecore__button {
    background-color: #ffffff;
    color: #03103b;
    font-size: 14px;
    letter-spacing: -0.1px;
    border-radius: 5px;
    padding-left: 16px;
    padding-right: 16px;
    text-transform: uppercase;
    &:hover {
      box-shadow: #ffffff 0px 7px 18px -10px;
    }
  }
`;

export default NewsletterWrapper;

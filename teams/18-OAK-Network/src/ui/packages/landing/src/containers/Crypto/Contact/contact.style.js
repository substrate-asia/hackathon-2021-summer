import styled from 'styled-components';

const ContactFromWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: auto;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  position: relative;
  @media (max-width: 990px) {
    padding: 0 20px;
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
    @media (max-width: 575px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 20px;
    }
    &.is-material {
      &.is-focus {
        label {
          color: #aeb1b6;
          font-size: 12px;
        }
      }
    }

    input {
      height: 100%;
      background: #fff;
      font-size: 16px;
      font-weight: 500;
      color: #343d48;
      padding: 5px 15px;
      border-color: #dadada;
      border-style: solid;
      border-width: 2px;
      border-color: rgb(233, 227, 254);
      border-radius: 10px;
      background-color: rgb(243, 242, 250);
      height: 84px;
      @media (max-width: 575px) {
        height: 60px;
      }
    }

    label {
      font-size: 14px;
      color: #343d48;
      font-weight: 500;
      padding-left: 10px;
      top: 5px;
    }
  }

  .field-wrapper {
    height: 100%;
  }
  button {
    position: absolute;
    right: 20px;
    border-radius: 6px;
    background-color: rgb(106, 82, 253);
    height: 60px;
    top: 12px;
    &:hover {
      background-color: rgb(106, 82, 253);
      border-color: gb(106, 82, 253);
      opacity: 0.85;
    }
    @media (max-width: 990px) {
      right: 40px;
    }
    @media (max-width: 575px) {
      position: relative;
      right: 0;
      top: 0;
      height: 48px;
    }
  }
`;
const SectionMainWrapper = styled.div`
  margin-top: -450px;
  z-index: 1;
  position: relative;
  @media (max-width: 768px) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media (max-width: 480px) {
    padding-left: 15px;
    padding-right: 15px;
  }
  .containerClass {
    border-radius: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 94px 6px rgba(107, 83, 254, 0.1);
    padding: 80px 0;

    .contactdes {
      text-align: center;
      @media (max-width: 990px) {
        padding: 0 20px;
      }
    }
  }
`;
export { SectionMainWrapper };

export default ContactFromWrapper;

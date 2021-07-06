import styled from 'styled-components';
import FooterIamge from 'common/assets/image/crypto/footer.png';

const FooterWrapper = styled.section`
  padding: 120px 0;
  background-image: url(${FooterIamge});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  z-index: 1;
  @media (max-width: 1440px) {
    padding: 80px 0 60px;
  }
  @media (max-width: 990px) {
  }
  @media (max-width: 767px) {
  }

  .Language_search_select {
    max-width: 135px;
    @media (max-width: 575px) {
      height: 52px;
      margin-bottom: 20px;
    }
    @media (max-width: 480px) {
      height: 20px;
      margin-bottom: 0px;
    }
    .select__control,
    .select-field__wrapper {
      height: 100%;
    }
    .select__control {
      padding: 0 15px 0 0px;
      box-shadow: none;
      position: relative;
      border-color: transparent;
      background: transparent;
      @media (min-width: 576px) {
        border-color: transparent;
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        &:before {
          content: '';
          position: absolute;
          width: 1px;
          height: 55%;
          background: transparent;
          display: block;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }

      .select__placeholder {
        font-size: 16px;
        color: #fff;
        font-family: 'Lato';
        font-weight: 400;
      }
      .select__indicator {
        color: #fff;
      }
      .select__value-container {
        padding: 0;
        .select__single-value {
          font-size: 16px;
          color: #fff;
          font-family: 'Lato';
          font-weight: 400;
        }
      }
    }
    .select__indicator-separator {
      display: none;
    }
  }
  .appDownload {
    margin-top: 60px;
    margin-bottom: 30px;
  }
  .imageWrapper {
    display: flex;
    @media (max-width: 1200px) {
      flex-direction: column;
    }
    img {
      margin-right: 15px;
      @media (max-width: 1200px) {
        margin-bottom: 15px;
        margin-right: 0;
        width: 150px;
      }
    }
  }
  .copyRight {
    margin-top: 120px;
    margin-left: 0;
    margin-right: 0;
    width: calc(100% - 80px);
    @media (max-width: 1440px) {
      margin-top: 80px;
    }
    @media (max-width: 768px) {
      width: calc(100% - 20px);
      margin-top: 60px;
    }
    @media (max-width: 600px) {
      margin-top: 20px;
    }
    .copyRightText {
      font-size: 16px;
      font-family: 'Lato';
      font-weight: 400;
      color: #fff;
      @media (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
    .footer_social {
      margin-left: auto;
      margin-top: -15px;
      @media (max-width: 600px) {
        margin-left: 0;
        margin-top: 15px;
      }
      a {
        &:hover {
          color: #fff;
          opacity: 0.85;
        }
      }
    }
  }
  .mainRow {
    margin-top: 100px;
  }
`;

const List = styled.ul``;

const ListItem = styled.li`
  a {
    color: #fff;
    font-size: 14px;
    line-height: 36px;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
      opacity: 0.85;
    }
  }
`;
export const BgImageWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: 0;
  @media (max-width: 1200px) {
    display: none;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export { List, ListItem };

export default FooterWrapper;

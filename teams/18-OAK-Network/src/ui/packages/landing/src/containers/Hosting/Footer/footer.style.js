import styled from 'styled-components';
import FooterImage from 'common/assets/image/hosting/footer-bg.png';

const FooterWrapper = styled.footer`
  position: relative;
  background-color: #f9fbfd;
  overflow: hidden;
  @media (min-width: 576px) {
    padding-top: 130px;
    &:before {
      content: '';
      position: absolute;
      width: 104%;
      padding-bottom: 104%;
      border-top-right-radius: 11%;
      top: 14%;
      left: 0;
      pointer-events: none;
      background-color: #fff;
      transform: rotate(-6deg);
      @media (max-width: 767px) {
        padding-bottom: 150%;
      }
    }
  }

  .footer_container {
    background-repeat: no-repeat;
    background-position: center 50px;
    padding-top: 80px;
    padding-bottom: 80px;
    position: relative;
    @media (min-width: 576px) {
      background-image: url(${FooterImage});
    }
    @media (max-width: 990px) {
      padding-bottom: 40px;
    }
    @media (max-width: 767px) {
      padding-bottom: 0px;
    }
  }
`;

const List = styled.ul``;

const ListItem = styled.li`
  a {
    color: rgba(52, 61, 72, 0.8);
    font-size: 14px;
    line-height: 36px;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
      color: #343d48;
    }
  }
`;

export { List, ListItem };

export default FooterWrapper;

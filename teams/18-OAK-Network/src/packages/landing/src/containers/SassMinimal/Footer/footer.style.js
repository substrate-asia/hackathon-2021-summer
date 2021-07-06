import styled from 'styled-components';

const FooterWrapper = styled.footer`
  position: relative;
  background-color: #f9fbfd;
  overflow: hidden;

  .footer_container {
    position: relative;
    max-width: 1200px;
    padding-top: 55px;
    padding-bottom: 30px;
  }
  .footerText p,
  .footerText {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 1.67;
    color: #09131f;
    a {
      color: #c36276;
      text-decoration: underline;
    }
  }
  .footerSocial {
    display: flex;
    margin-top: 5px;
    align-items: center;
    a + a {
      margin-left: 15px;
    }
  }
`;

const List = styled.ul``;

const ListItem = styled.li`
  a {
    color: rgba(2, 7, 62, 0.8);
    font-size: 14px;
    line-height: 36px;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
      color: #0f2137;
    }
  }
`;

export { List, ListItem };

export default FooterWrapper;

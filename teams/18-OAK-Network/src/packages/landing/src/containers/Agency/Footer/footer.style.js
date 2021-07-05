import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import FooterIamge from 'common/assets/image/agency/footer-bg.png';

const FooterWrapper = styled.section`
  padding: 80px 0;
  margin-top: 40px;
  background-image: url(${FooterIamge});
  background-repeat: no-repeat;
  background-position: center 50px;
  border-top: 1px solid #efefef;
  overflow: hidden;
  @media (max-width: 990px) {
    padding-bottom: 30px;
  }
  @media (max-width: 767px) {
    padding-bottom: 10px;
  }

  .social {
    width: 50%;
    display: flex;
    justify-content: space-around;
  }

  .menu {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

const List = styled.ul``;

const ListItem = styled.li`
  a {
    color: ${themeGet('colors.textColor', 'rgba(52, 61, 72, 0.8)')};
    font-size: 14px;
    line-height: 36px;
    transition: all 0.2s ease;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
      color: ${themeGet('colors.quoteText', '#343d48')};
    }
  }
`;

export { List, ListItem };

export default FooterWrapper;

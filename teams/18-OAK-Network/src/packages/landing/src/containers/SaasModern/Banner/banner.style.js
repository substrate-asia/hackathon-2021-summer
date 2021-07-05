import styled from 'styled-components';
import BannerBG from 'common/assets/image/saasModern/banner-texture.png';

export const BannerWrapper = styled.section`
  padding: 150px 0 50px 0;
  background-image: url(${BannerBG}),
    linear-gradient(35deg, rgb(147, 249, 185) 0%, rgb(29, 151, 108) 100%);
  background-size: cover;
  background-position: top center;
  @media (max-width: 575px) {
    padding: 120px 0 0 0;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export const DiscountWrapper = styled.div`
  text-align: center;
`;

export const DiscountLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  border-radius: 4em;
  padding: 9px 22px;
  margin-bottom: 22px;
  background-color: rgba(255, 255, 255, 0.15);
  @media (max-width: 575px) {
    padding: 7px 10px;
  }
`;

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const ServiceSection = styled.section`
  padding: 0 0 180px;
  @media only screen and (max-width: 1440px) {
    padding: 0 0 100px;
  }
  @media only screen and (max-width: 1300px) {
    padding: 0 0 70px;
  }
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    padding-bottom: 70px;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    padding-top: 40px;
  }
  @media only screen and (max-width: 480px) {
    padding: 0 0 50px;
  }
`;

export const ServiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ServiceItem = styled.div`
  text-align: center;
  margin: 10px;
  border: 1px solid #f0f2f8;
  border-radius: 5px;
  padding: 30px;
  width: calc(25% - 20px);
  transition: all 0.3s ease 0s;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
    width: calc(33.3333% - 20px);
  }
  @media only screen and (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media only screen and (max-width: 768px) {
    width: calc(50% - 20px);
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
  h4 {
    font-weight: 500;
    font-size: 17px;
    line-height: 30px;
    margin: 0;
  }
  p {
    color: ${themeGet('colors.secondary')};
    font-weight: 700;
    font-size: 15px;
    line-height: 30px;
    margin: 5px 0 0 0;
  }
  &:hover {
    box-shadow: 0px 11px 30px rgba(51, 83, 145, 0.07);
  }
`;

export default ServiceSection;

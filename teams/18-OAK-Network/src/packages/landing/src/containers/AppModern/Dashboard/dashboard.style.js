import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const DashboardWrapper = styled.section`
  padding-top: 120px;
  padding-bottom: 240px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100%;
  position: relative;
  background-color: #fff;
  /* background-image: linear-gradient(
		to bottom,
		#fff 35%,
		rgb(244, 246, 250) 100%
	); */
  @media (max-width: 1800px) {
    padding-bottom: 180px;
  }
  @media (max-width: 1600px) {
    padding-top: 80px;
    padding-bottom: 160px;
  }
  @media (max-width: 1440px) {
    padding-top: 30px;
    padding-bottom: 100px;
  }
  @media (max-width: 1024px) {
    padding-top: 30px;
    padding-bottom: 60px;
  }
  @media (max-width: 767px) {
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: auto;
  }

  @media only screen and (max-width: 480px) {
    background: none;
  }

  .particle {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    @media (max-width: 767px) {
      display: none;
    }
    @media only screen and (max-width: 480px) {
      width: 100%;
    }
  }

  .row {
    position: relative;
    z-index: 1;
  }

  .button__wrapper {
    margin-top: 40px;
    @media (max-width: 1024px) {
      margin-top: 25px;
    }

    @media (max-width: 767px) {
      margin-bottom: 30px;
    }
    @media (max-width: 767px) {
      margin-top: 0px;
    }
    .reusecore__button {
      border-radius: 5px;
      font-weight: 500;
      &.outlined {
        border-color: rgba(82, 104, 219, 0.2);
      }
      &:hover {
        box-shadow: ${themeGet('colors.primary', '#F6C416')} 0px 12px 24px -10px;
      }
    }
  }
  .subtitle {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 12px;
    letter-spacing: 1.5px;
    color: #d1397c;
    text-transform: uppercase;
  }
`;

const DashboardObject = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 20px;
  right: 0;
  display: flex;
  align-items: center;
  @media (max-width: 990px) {
    top: 50px;
  }
  @media (max-width: 767px) {
    display: none;
  }
  .dashboardWrapper {
    height: 100%;
  }
`;

export { DashboardObject };

export default DashboardWrapper;

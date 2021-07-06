import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import BannerBG from 'common/assets/image/agency/agency-banner.png';

const BannerWrapper = styled.section`
  padding-top: 210px;
  padding-bottom: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  
  .block {
    display: flex;
    flex-direction: column;
  }

  .mr-30 {
    margin-right: 30px;
  }

  .count-down {
    display: flex;
    flex-direction: column;
    height: 200px;
  }

  .title {
    font-size: 2.5rem;
  }

  .count-down-text {
    margin-top: 20px;
    font-size: 1.5rem;
  }
  
  .participate {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .carousell {
    display: flex;
    background-color: rgba(237,237,240);
    height: 300px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .create-project {
    align-self: center;
    width: 80%;
  }

  .row {
    position: relative;
    z-index: 1;
  }
  .button__wrapper {
    margin-top: 40px;
    .reusecore__button {
      &:first-child {
        transition: all 0.3s ease;
        &:hover {
          box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
        }
      }
    }
  }

  @media only screen and (max-width: 990px) {
    .block {
      margin-top: 20px;
    }
  }
`;

export default BannerWrapper;

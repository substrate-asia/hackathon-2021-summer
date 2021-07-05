import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const PricingTableWrapper = styled.div`
  .glide__slides {
    align-items: stretch;
    .glide__slide {
      height: auto;
    }
  }
`;

const PricingTable = styled.div`
  border: 1px solid #f9fafb;
  border-radius: 5px;
  padding: 45px 45px 50px 45px;
  border-radius: 15px;
  background-color: #f9fafb;
  height: 100%;
  transition: 0.25s ease-in-out;
  @media (max-width: 767px) {
    padding: 45px 35px;
  }
  &:hover {
    background-color: #fff;
    border-color: #f2f4f7;
  }
`;

const PricingHead = styled.div`
  margin-bottom: 35px;
`;

const PricingPrice = styled.div`
  margin-bottom: 50px;
`;

const PricingButton = styled.div`
  text-align: center;
  .reusecore__button {
    border-radius: 4px;
  }
  .trial_button {
    font-size: 15px;
    font-weight: 500;
    color: #3b93ff;
    display: block;
    margin-top: 25px;
    transition: 0.15s ease-in-out;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const PricingList = styled.div`
  margin-bottom: 50px;
`;

const ListItem = styled.div`
  display: flex;
  margin-bottom: 23px;
  justify-content: center;
  &:last-child {
    margin-bottom: 0;
  }
  .price_list_icon {
    color: #18d379;
    margin-right: 10px;
  }
`;

const SwitchWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
  .reusecore__switch {
    .reusecore__field-label {
      font-size: 16px;
      font-weight: 400;
      color: #5c636c;
      cursor: pointer;
    }
    input[type='checkbox'] {
      &:checked {
        + div {
          width: 40px !important;
          background-color: ${themeGet('colors.primary')};
          > div {
            left: 17px !important;
          }
        }
      }
      + div {
        background-color: #f0f0f0;
        background-color: #f0f0f0;
        border: 0;
        width: 40px;
        height: 25px;
        > div {
          background-color: #fff;
          box-shadow: 0px 2px 3px 0.24px rgba(31, 64, 104, 0.25);
          width: 21px;
          height: 21px;
          top: 2px;
          left: 2px;
        }
      }
    }
  }
`;

const PricingButtonWrapper = styled.div`
  text-align: center;
  margin-top: 80px;
  position: relative;
  @media (max-width: 575px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: #e7e8eb;
    display: block;
    bottom: 0;
    left: 0;
  }
  .reusecore__button {
    font-size: 18px;
    font-weight: 500;
    color: #90949b;
    background: transparent;
    height: auto;
    min-width: 200px;
    border: none;
    padding-bottom: 30px;
    position: relative;
    transition: 0.15s ease-in-out;
    @media (max-width: 767px) {
      min-width: 0;
      padding: 0 15px 10px 15px;
      font-size: 14px;
    }
    &:hover {
      color: #ff4362;
    }
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      display: block;
      background: #ff4362;
      transform: scaleX(0);
      transform-origin: right center 0;
      transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
    }
    &.active-item {
      color: #ff4362;
      &:after {
        transform: scaleX(1);
        transform-origin: left center 0;
        transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
      }
    }
    @media (max-width: 575px) {
      font-size: 14px;
      height: 44px;
      width: 120px;
      padding: 0 5px;
    }
  }
  > a {
    font-size: 18px;
    font-weight: 500;
    color: #3b93ff;
    padding: 0 40px;
    @media (max-width: 767px) {
      padding: 0 15px 10px 15px;
      font-size: 14px;
      height: 46px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export {
  PricingHead,
  PricingPrice,
  PricingButton,
  PricingList,
  ListItem,
  SwitchWrapper,
  PricingButtonWrapper,
};
export default PricingTable;

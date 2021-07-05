import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const PricingTable = styled.div`
  border: 1px solid #f2f4f7;
  border-radius: 5px;
  padding: 60px 45px;
  border-radius: 5px;
  margin-bottom: 30px;
  @media (max-width: 990px) {
    padding: 50px 40px;
  }
  @media (max-width: 767px) {
    padding: 45px 35px;
  }
  @media (max-width: 575px) {
    padding: 40px 30px;
  }
  a:not([href]),
  a[href],
  a[data-href] {
    backface-visibility: hidden;
  }
`;

const PricingHead = styled.div`
  margin-bottom: 40px;
`;

const PricingPrice = styled.div`
  margin-bottom: 30px;
`;

const PricingButton = styled.div`
  text-align: center;
  margin-bottom: 55px;
  @media (max-width: 767px) {
    margin-bottom: 40px;
  }
`;

const PricingList = styled.div``;

const ListItem = styled.div`
  display: flex;
  margin-bottom: 19px;
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
    input[type='checkbox'].switch {
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

export {
  PricingHead,
  PricingPrice,
  PricingButton,
  PricingList,
  ListItem,
  SwitchWrapper,
};
export default PricingTable;

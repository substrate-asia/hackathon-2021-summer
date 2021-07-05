import styled from 'styled-components';

export const PricingWrapper = styled.section`
  position: relative;
  background-color: #020718;
  padding-top: 75px;
  padding-bottom: 70px;

  .blockTitle {
    text-align: center;
    margin-bottom: 40px;
    h2 {
      margin: 0;
      font-style: normal;
      font-weight: 500;
      font-size: 26px;
      letter-spacing: -0.02em;
      color: #fff;
      margin-bottom: 10px;
    }
    p {
      color: #858b91;
      margin: 0;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
    }
  }
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -20px;
    margin-right: -20px;
  }
  .col {
    flex: 1 1 33.333%;
    padding-left: 20px;
    padding-right: 20px;
    @media (max-width: 991px) {
      flex: 1 1 100%;
    }
  }

  .pricingBox {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding-top: 50px;
    margin-bottom: 30px;
    &.recomended {
      background-color: #fff;
      p {
        color: #0f2137;
      }
    }
    p {
      margin: 0;
      color: #fff;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: -0.55px;
      line-height: 1;
      padding-left: 40px;
      margin-top: 14px;
    }
  }
  .pricingHeading {
    display: flex;
    align-items: baseline;
    padding-left: 40px;
    h3 {
      margin: 0;
      color: #fff;
      letter-spacing: -0.55px;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      line-height: 1;
    }
    span {
      display: block;
      margin-bottom: 0;
      color: #8d909c;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
    }
  }
  .recomended .pricingHeading {
    h3 {
      color: #0f2137;
    }
    span {
      color: #8d909c;
    }
  }
  .hr {
    width: calc(100% - 60px);
    height: 1px;
    background-color: #fff;
    opacity: 0.15;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 33px;
    margin-bottom: 28px;
  }
  .recomended .hr {
    background-color: #d7dbe9;
    opacity: 1;
  }
  .pricingList {
    padding-left: 40px;
  }
  .pricingListItem {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #fff;
    &.disabled {
      opacity: 0.5;
      i {
        color: #ced7e1;
      }
    }
    i {
      font-size: 20px;
      color: #3fdbb1;
      margin-right: 15px;
      position: relative;
      top: -1px;
    }
  }
  .recomended .pricingListItem {
    color: #0f2137;
  }
  .pricingListItem + .pricingListItem {
    margin-top: 20px;
  }
  .pricingBtn {
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-left: 40px;
    padding-right: 40px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    padding-top: 35.5px;
    padding-bottom: 35.5px;
    margin-top: 42px;
    i {
      font-size: 15px;
      color: #fff;
    }
  }
  .recomended .pricingBtn {
    background-color: #f0f0f5;
    color: #0f2137;
    i {
      color: #0f2137;
    }
  }
  .pricingFilter {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
    span {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: -0.562737px;
      color: #ffffff;
      display: flex;
      align-items: center;
      &.pricingOffer {
        margin-left: 10px;
        padding: 4px 10px;
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: 17px;
        background: #f04037;
        border-radius: 5px;
      }
    }
    .reusecore__switch {
      margin-left: 10px;
      margin-right: 10px;
      input[type='checkbox'] + div {
        width: 66px;
        height: calc(66px / 2);
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0);
        > div {
          width: calc(66px / 2 - 8px);
          height: calc(66px / 2 - 8px);
        }
      }
      input[type='checkbox'].switch:checked + div {
        background-color: #f04037;
        border-color: rgba(255, 255, 255, 0);
      }
      input[type='checkbox'].switch:checked + div > div {
        left: calc(66px / 2 + 3px);
      }
    }
  }
  .recomended {
    position: relative;
    .recomendedLabel {
      position: absolute;
      top: 0;
      left: 40px;
      transform: translateY(-50%);
      display: flex;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      letter-spacing: -0.14px;
      color: #ffffff;
      background-color: #c36276;
      border-radius: 3px;
      margin-bottom: 0;
      padding: 6.5px 14px;
    }
  }

  #pricingUsers {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 35px;
    margin-bottom: 22.5px;
  }
  .select__control {
    border: 1px solid #d7dbe9;
    box-shadow: none !important;
    border-radius: 5px;
  }
  .select__signle-value {
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    color: #0f2137;
  }
  .select__value-container {
    padding: 9.5px 8px;
  }
`;

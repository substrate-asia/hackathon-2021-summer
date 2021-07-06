import styled from 'styled-components';
const PricingArea = styled.section`
  padding-top: 150px;
  @media (max-width: 1600px) {
    padding-top: 100px;
  }
  .Container {
    max-width: 920px;
  }
  .reusecore__switch {
    margin-left: 10px;
    margin-right: 10px;
    input[type='checkbox'] + div {
      width: 66px;
      height: calc(66px / 2);
      background-color: #3fdbb1;
      border-color: rgba(255, 255, 255, 0);
      > div {
        width: calc(66px / 2 - 8px);
        height: calc(66px / 2 - 8px);
      }
    }
    input[type='checkbox'].switch:checked + div {
      width: 66px;
      background-color: #3fdbb1;
      border-color: rgba(255, 255, 255, 0);
    }
    input[type='checkbox'].switch:checked + div > div {
      left: calc(66px / 2 + 3px);
    }
  }
  .priceFilter {
    margin-bottom: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 575px) {
      margin-bottom: 40px;
    }
    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 1;
      text-align: center;
      color: #0f2137;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeIn2 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const TopHeading = styled.div`
  text-align: center;
  margin-bottom: 30px;
  h2 {
    font-weight: 500;
    font-size: 28px;
    text-align: center;
    letter-spacing: -0.5px;
    margin-bottom: 0;
    color: #0f2137;
    @media (max-width: 1600px) {
      font-size: 24px;
    }
    @media (max-width: 575px) {
      font-size: 22px;
    }
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -20px;
  margin-right: -20px;
`;
export const Col = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding-left: 20px;
  padding-right: 20px;
  @media (max-width: 667px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;
export const PriceCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 3px 4px rgba(100, 135, 167, 0.08);
  h3 {
    font-weight: bold;
    font-size: 40px;
    text-transform: capitalize;
    color: #0f2137;
    margin-bottom: 0;
    line-height: 1;
    margin-top: -10px;
  }
  h4 {
    font-weight: 500;
    font-size: 30px;
    letter-spacing: -0.55px;
    line-height: 1;
    margin-bottom: 0;
    color: #0f2137;
  }
  .priceBtn {
    width: 100%;
    background-color: #108aff;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    min-height: 60px;
    margin-top: 50px;
    transition: all 500ms ease;
    i {
      margin-left: 10px;
    }
    &:hover {
      background-color: #0f2137;
      color: #fff;
    }
  }
  .priceList {
    li {
      color: #0f2137;
      font-size: 16px;
      line-height: 1.75;
      position: relative;
      animation: fadeIn 0.8s linear;
      padding-left: 35px;
      + li {
        margin-top: 10px;
      }
      i {
        position: absolute;
        left: 0;
        top: 0;
        color: #3fdbb1;
      }
    }
  }
  &.recommended {
    background-color: #108aff;
    @media (max-width: 667px) {
      margin-top: 30px;
    }
    h3,
    h4,
    p,
    span.pricingLabel {
      color: #fff;
    }
    ul li,
    ul li i {
      color: #fff;
    }
    .priceBtn {
      background-color: #fff;
      color: #108aff;
      &:hover {
        background-color: #0f2137;
        color: #fff;
      }
    }
  }
`;
export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn2 0.8s linear;
  padding-top: 50px;
  margin-bottom: 70px;
`;
export const CardBody = styled.div`
  > span.pricingLabel {
    display: block;
    font-weight: bold;
    font-size: 16px;
    line-height: 1;
    color: #0f2137;
    margin-bottom: 30px;
    animation: fadeIn2 0.8s linear;
  }
`;
export const CardFooter = styled.div`
  animation: fadeIn2 0.8s linear;
  padding-bottom: 50px;
`;
export const PricingAmount = styled.div`
  text-align: right;
  p {
    margin-top: 5px;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.5px;
    color: #8d909c;
    line-height: 1;
  }
`;
export default PricingArea;

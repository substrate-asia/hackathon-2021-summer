import styled from 'styled-components';

const ProcessItem = styled.div`
  position: relative;
`;

export const ProcessIndex = styled.span`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #343d48;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0px 6px 10.34px 0.66px rgba(42, 96, 151, 0.25);
  position: absolute;
  top: -15px;
  left: -15px;
  z-index: 1;
  @media (max-width: 990px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    top: -13px;
    left: -13px;
  }
`;

export default ProcessItem;

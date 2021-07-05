import styled from 'styled-components';

export const CallToActionWrapper = styled.div`
  position: relative;
  background-color: #fff;
  padding: 40px 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -105px;
  @media (max-width: 990px) {
    padding: 35px 40px;
  }
  @media (max-width: 575px) {
    padding: 35px 20px;
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

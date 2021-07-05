import styled from 'styled-components';

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 25px;
  padding-right: 25px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  @media (min-width: 320px) {
    padding-left: 25px;
    padding-right: 23px;
  }
  @media (min-width: 768px) {
    max-width: 750px;
  }
  @media (min-width: 992px) {
    max-width: 970px;
  }
  @media (min-width: 1200px) {
    max-width: 1170px;
  }
`;

export { Container };

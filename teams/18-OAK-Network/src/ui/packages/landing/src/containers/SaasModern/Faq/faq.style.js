import styled from 'styled-components';

const FaqWrapper = styled.div`
  .accordion_item {
    border: 1px solid #eff2f5;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .accordion_title {
    padding: 23px 30px;
    @media (max-width: 575px) {
      padding: 15px 20px;
    }
  }

  .accordion_body {
    padding: 0 30px 23px 30px;
    @media (max-width: 575px) {
      padding: 0 20px 15px 20px;
    }
  }
`;

export default FaqWrapper;

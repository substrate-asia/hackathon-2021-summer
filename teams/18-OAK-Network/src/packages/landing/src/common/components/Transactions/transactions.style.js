import styled from 'styled-components';

const TransactionsStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #f1f4f6;
  padding-bottom: 30px;

  .vote-row {
    border: 1px solid #f1f4f6;
    margin-top: 10px;
    padding: 10px;
  }
`;

TransactionsStyle.displayName = 'TransactionsStyle';

export default TransactionsStyle;

import styled from 'styled-components';

const ContributorsStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #f1f4f6;
  padding-bottom: 30px;

  .contribution-row {
    margin-top: 10px;
    padding: 20px;
    border: 1px solid #f1f4f6;
  }

  .contribution-value {
    margin-left: 100px;
  }
`;

ContributorsStyle.displayName = 'ContributorsStyle';

export default ContributorsStyle;

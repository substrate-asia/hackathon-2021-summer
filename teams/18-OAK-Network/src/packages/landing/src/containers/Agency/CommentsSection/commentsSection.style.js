import styled from 'styled-components';

const CommentsSectionWrapper = styled.div`
  .buttons {
    margin-top: 30px;
    border: 1px solid #f1f4f6;
    border-bottom: 0px;
  }

  .buttons > button {
    width: 200px;
    height: 50px;
  }

  .selected {
    background-color: white;
    color: #10ac84;
  }

  .notSelected {
    background-color: #10ac84;
    color: white;
  }
`;

CommentsSectionWrapper.displayName = 'CommentsSectionWrapper';

export default CommentsSectionWrapper;

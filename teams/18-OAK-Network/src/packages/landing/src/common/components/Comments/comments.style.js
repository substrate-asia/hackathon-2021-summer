import styled from 'styled-components';

const CommentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #f1f4f6;
  padding-bottom: 30px;

  .content-div {
    width: 90%;
    align-self: center;
    display: flex;
    flex-direction: column;
  }

  .comment-input {
    margin-top: 30px;
    width: 100%;
    height: 60px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #f1f4f6;
  }

  .leave-comment {
    width: 200px;
    height: 30px;
    align-self: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
`;

CommentsStyle.displayName = 'CommentsStyle';

export default CommentsStyle;

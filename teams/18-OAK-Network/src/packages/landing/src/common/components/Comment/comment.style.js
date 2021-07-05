import styled from 'styled-components';

const CommentStyle = styled.div`
  margin-top: 20px;
  border: 1px solid #f1f4f6;
  padding: 20px;
  display: flex;
  flex-direction: row;

  .user-info {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .photo {
    border-radius: 10px;
    width: 70px;
    height: 70px;
    border: 1px solid black;
  }

  .button {
    border: 0;
    margin-left: 10px;
    background-color: white;
  }

  .button-text {
    margin-left: 5px;
  }
`;

CommentStyle.displayName = 'CommentStyle';

export default CommentStyle;

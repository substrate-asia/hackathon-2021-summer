import styled from 'styled-components';
import { variant } from 'styled-system';

const ModalStyle = styled.div`
  /* Modal default style */
  overflow: hidden;

  border-radius: 8px;
  padding: 48px 30px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(23 53 102 / 50%) 0px 15px 50px 0px;

  .model-title {
    font-size: 1.6rem;
    color: rgb(15, 33, 55);
    font-weight: 500;
    text-align: center;
    letter-spacing: -0.025em;
  }

  .modal-text {
    font-size: 1.2rem;
  }

  .ant-col {
    text-align: center;
  }

  .modal-list {
    .ant-col {
      font-size: 1.2rem;
      font-weight: 400;
      padding: 16px 0px;
      margin-bottom: 12px;
      box-shadow: 0px 3px 8px 0px rgb(43 83 135 / 40%);
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .modal-btn-close {
    border: 0px rgb(209, 57, 124);
    color: white;
    background-color: rgb(209, 57, 124);
    padding: 18px 48px;
    border-radius: 5px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 64px;
  }
`;

// prop types can also be added from the style functions
ModalStyle.propTypes = {
  ...variant.propTypes,
};

ModalStyle.displayName = 'ModalStyle';

export default ModalStyle;

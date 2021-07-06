import styled from 'styled-components';

export const ActiveStatus = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  margin-right: 20px;
  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00ff24;
    border: 3px solid #fff;
    right: -2px;
    bottom: -2px;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

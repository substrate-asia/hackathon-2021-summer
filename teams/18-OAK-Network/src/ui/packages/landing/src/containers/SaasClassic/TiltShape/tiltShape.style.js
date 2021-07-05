import styled from 'styled-components';

const ShapeWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  & ~ div {
    z-index: 1;
    position: relative;
  }
`;

export default ShapeWrapper;

import styled from 'styled-components';

export const ClientsImage = styled.div`
  position: relative;
  padding: 20px 28px;
  flex-shrink: 0;
  &:hover {
    img {
      filter: grayscale(0);
      opacity: 1;
    }
  }

  img {
    filter: grayscale(1);
    opacity: 0.5;
    transition: 0.3s ease-in-out;
  }
`;

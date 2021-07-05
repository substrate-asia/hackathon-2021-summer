import styled from 'styled-components';

const GalleryArea = styled.section`
  padding-top: 100px;
  @media (max-width: 575px) {
    padding-top: 0px;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;
export const Col = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding-left: 15px;
  padding-right: 15px;
  @media (max-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
    img {
      width: 100%;
    }
  }
  @media (max-width: 575px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-top: 30px;
    text-align: center;
    img {
      margin-left: auto;
      margin-right: auto;
    }
  }
  &:nth-of-type(even) img {
    margin-top: 50px;
    @media (max-width: 575px) {
      margin-top: 0;
    }
  }
`;

export default GalleryArea;

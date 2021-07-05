import styled from 'styled-components';

const BlogArea = styled.section`
  padding-bottom: 100px;
  padding-top: 150px;
  @media (max-width: 1600px) {
    padding-top: 100px;
    padding-bottom: 55px;
  }
  .Container {
    max-width: 1170px;
  }
`;
export const BlockTitle = styled.div`
  text-align: center;
  margin-bottom: 85px;
  @media (max-width: 1600px) {
    margin-bottom: 60px;
  }
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
  h3 {
    font-size: 28px;
    color: #0f2137;
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.5px;
    @media (max-width: 1600px) {
      font-size: 24px;
    }
    @media (max-width: 575px) {
      font-size: 22px;
    }
  }
  p {
    font-size: 16px;
    color: #0f2137;
    margin: 0;
    margin-top: 20px;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;
export const Col = styled.div`
  flex: 0 0 33.333%;
  max-width: 33.333%;
  padding-left: 15px;
  padding-right: 15px;
  @media (max-width: 575px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const BlogCard = styled.div`
  background-color: #fff;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-radius: 6px;
  box-shadow: 0px 3px 4px rgba(100, 135, 167, 0.08);
  > img {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  h3 {
    font-size: 18px;
    line-height: 1.56;
    color: #0f2137;
    margin-bottom: 0;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    margin-bottom: 5px;
    @media (max-width: 1600px) {
      font-size: 17px;
    }
    @media (max-width: 1199px) {
      font-size: 15px;
    }
  }
  .blogLink {
    color: #3183ff;
    font-size: 15px;
    font-weight: 500;
    padding-left: 20px;
    padding-right: 20px;
    i {
      position: relative;
      top: -2px;
    }
  }
`;
export default BlogArea;

import styled from 'styled-components';

const CallToActionArea = styled.section`
  .Container {
    max-width: 1170px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 60px;
    @media (max-width: 991px) {
      flex-direction: column;
      text-align: center;
      justify-content: center;
    }
  }
  h3 {
    letter-spacing: -0.02em;
    font-size: 36px;
    line-height: 1.81;
    margin-bottom: 0;
    margin-bottom: 10px;
    @media (max-width: 1600px) {
      font-size: 30px;
    }
    @media (max-width: 991px) {
      margin-bottom: 0;
    }
    @media (max-width: 575px) {
      font-size: 26px;
      line-height: 1.6;
    }
  }
  p {
    font-size: 19px;
    color: #0f2137;
    opacity: 0.7;
    line-height: 1.84;
    letter-spacing: 0.1px;
    @media (max-width: 575px) {
      font-size: 16px;
    }
  }
`;
export const Left = styled.div`
  @media (max-width: 991px) {
    margin-bottom: 30px;
  }
`;
export const Right = styled.div`
  > a {
    display: inline-block;
    background-color: #108aff;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 20px 35px;
    border-radius: 30px;
    transition: all 500ms ease;
    &:hover {
      background-color: #23374d;
    }
    > i {
      margin-left: 5px;
    }
  }
`;

export default CallToActionArea;

import styled from 'styled-components';

const FooterArea = styled.footer`
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1170px;
    border-top: 1px solid #dfe4ed;
    padding-top: 45px;
    padding-bottom: 50px;
    @media (max-width: 1600px) {
      padding-top: 35px;
      padding-bottom: 35px;
    }
    @media (max-width: 991px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const Left = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  p {
    position: relative;
    top: 2px;
    font-size: 15px;
    color: #09131f;
    line-height: 1;
    margin-left: 15px;
    @media (max-width: 1600px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      margin-top: 10px;
    }
    a {
      color: #108aff;
      margin-left: 10px;
    }
  }
`;
export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  a {
    color: #0f2137;
    transition: all 500ms ease;
    @media (max-width: 1600px) {
      font-size: 14px;
    }
    &:hover {
      color: #108aff;
    }
    + a {
      margin-left: 35px;
    }
  }
`;
export const CopyText = styled.p`
  margin: 0;
`;
export const Social = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  a {
    margin-left: 15px;
  }
`;
export const SocialText = styled.span`
  font-size: 15px;
  color: #0f2137;
  line-height: 1;
  @media (max-width: 1600px) {
    font-size: 14px;
  }
`;

export default FooterArea;

import styled from 'styled-components';

const SectionWrapper = styled.div`
  padding: 81px 0;
  @media only screen and (max-width: 1440px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 767px) {
    padding: 42px 0;
  }
`;

export const Container = styled.div`
  max-width: 1627px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1700px) {
    padding: 0 70px;
  }
  @media only screen and (max-width: 1360px) {
    padding: 0 30px;
  }
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled.div`
  width: calc(100% - 507px);
  padding-right: 75px;
  position: relative;
  @media only screen and (max-width: 1200px) {
    width: 60%;
    padding-right: 50px;
  }
  @media only screen and (max-width: 991px) {
    padding-right: 0;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    padding-right: 0;
    margin-bottom: 30px;
    transform: rotateY(-180deg);
  }
`;

export const TextWrapper = styled.div`
  width: 507px;
  @media only screen and (max-width: 991px) {
    padding-left: 50px;
  }
  @media only screen and (max-width: 767px) {
    padding-left: 0;
    width: 100%;
  }

  h2 {
    @media only screen and (min-width: 1441px) {
      margin-bottom: 60px;
    }
    @media only screen and (min-width: 1440px) {
      margin-bottom: 40px;
    }
    @media only screen and (min-width: 767px) {
      margin-bottom: 30px;
    }
  }

  p {
    margin-bottom: 30px;
  }

  .learn__more-btn {
    margin-top: 20px;
  }
`;

export default SectionWrapper;

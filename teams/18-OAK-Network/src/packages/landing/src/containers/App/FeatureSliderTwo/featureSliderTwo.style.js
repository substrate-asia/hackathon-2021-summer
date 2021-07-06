import styled from 'styled-components';

const FeatureSectionTwoWrapper = styled.section`
  padding: 80px 0 160px;
  @media (max-width: 1440px) {
    padding: 40px 0 50px;
  }
  @media screen and (max-width: 1100px) and (min-width: 992px) {
    padding: 140px 0 60px;
  }
  @media (max-width: 991px) {
    padding: 60px 0 60px;
  }
  @media (max-width: 767px) {
    padding-top: 60px;
  }
`;

export default FeatureSectionTwoWrapper;

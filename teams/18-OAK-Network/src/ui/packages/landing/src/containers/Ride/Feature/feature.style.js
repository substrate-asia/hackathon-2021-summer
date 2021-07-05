import styled from 'styled-components';

const FeatureSectionWrapper = styled.section`
  padding: 40px 0 120px 0;
  @media (max-width: 1440px) {
    padding: 40px 0 80px 0;
  }

  @media (max-width: 990px) {
    padding: 60px 0 60px 0;
  }
  @media (max-width: 767px) {
    padding: 60px 0 30px 0;
  }
  .feature__block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default FeatureSectionWrapper;

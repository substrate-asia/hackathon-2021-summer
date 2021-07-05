import styled from 'styled-components';
import BgImage from 'common/assets/image/saas/map.png';

const PartnerSectionWrapper = styled.section`
  padding: 120px 0;
  background-color: #fafbff;
  background-image: url(${BgImage});
  background-repeat: no-repeat;
  background-position: 25% center;

  @media (max-width: 990px) {
    padding: 100px 0;
  }
  @media (max-width: 767px) {
    padding: 80px 0;
  }
  @media (max-width: 575px) {
    padding: 60px 0;
  }
`;

export default PartnerSectionWrapper;

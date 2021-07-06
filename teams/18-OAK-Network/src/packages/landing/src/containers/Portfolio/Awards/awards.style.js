import styled from 'styled-components';

export const AwardSectionWrapper = styled.section`
  padding: 150px 0;
  background-color: #f9f9f9;
  @media (max-width: 1200px) {
    padding: 110px 0;
  }
  @media (max-width: 990px) {
    padding: 100px 0;
  }
  @media (max-width: 767px) {
    padding: 80px 0;
  }
  @media (max-width: 575px) {
    padding: 60px 0;
  }

  .glide__controls {
    position: absolute;
    top: -155px;
    right: 0;
    @media (max-width: 767px) {
      top: -60px;
      left: 0;
      right: auto;
    }
    @media (max-width: 575px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const AwardItem = styled.div`
  padding: 50px 30px;
  background: #fff;
  border-radius: 10px;
  @media (max-width: 1200px) {
    padding: 40px 20px;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export const AwardeeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const AwardImageWrapper = styled.div`
  min-height: 97px;
`;

export const AwardeeLogo = styled.div`
  margin-right: 20px;
  flex-shrink: 0;
`;

export const AwardeeDetails = styled.div``;

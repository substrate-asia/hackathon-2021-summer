import styled from 'styled-components';

export const CompanyWrapper = styled.div`
  padding-top: 70px;
  padding-bottom: 100px;

  @media (max-width: 690px) {
    padding-bottom: 80px;
  }
  @media (max-width: 480px) {
    padding-bottom: 60px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    @media (max-width: 690px) {
      div {
        flex: 1 1 33.333%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }
    }

    @media (max-width: 480px) {
      div {
        flex: 1 1 100%;
      }
    }
    img {
      transition: 500ms;
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

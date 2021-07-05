import styled from 'styled-components';

const MatchingWrapper = styled.section`
  padding-top: 210px;
  padding-bottom: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  .block {
    display: flex;
    flex-direction: column;
  }

  .matcing {
    border: 2px solid rgba(237, 237, 240);
    border-radius: 20px;
    padding: 20px;
  }

  .mr-30 {
    margin-right: 30px;
  }

  .count-down {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 2.5rem;
    align-self: center;
  }

  .count-down-text {
    margin-top: 20px;
    font-size: 1.5rem;
    align-self: center;
  }

  .contribute-info {
    display: flex;
    flex-direction: row;
  }

  .contribute {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 30px;
  }

  .total {
    margin-top: 30px;
    position: relative;
    height: 30px;
    border: 1px solid rgba(237, 237, 240);
    border-radius: 20px;
  }

  .current {
    position: absolute;
    height: 30px;
    width: 50%;
    border-radius: 20px;
    background-color: #d1397c;
  }

  .participate {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }

  .carousell {
    display: flex;
    background-color: rgba(237, 237, 240);
    height: 300px;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .create-project {
    align-self: center;
    width: 80%;
  }

  .row {
    position: relative;
    z-index: 1;
  }
  .button__wrapper {
    margin-top: 40px;
    .reusecore__button {
      &:first-child {
        transition: all 0.3s ease;
        &:hover {
          box-shadow: 0px 9px 20px -5px rgba(16, 172, 132, 0.57);
        }
      }
    }
  }

  @media only screen and (max-width: 990px) {
    .block {
      margin-top: 20px;
    }
  }
`;

export default MatchingWrapper;

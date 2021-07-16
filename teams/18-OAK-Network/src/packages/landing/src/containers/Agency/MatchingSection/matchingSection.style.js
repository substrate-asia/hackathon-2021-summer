import styled from 'styled-components';

const MatchingWrapper = styled.section`
  padding-top: 210px;
  padding-bottom: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  font-size: 1.2rem;
  line-height: 2rem;
  color: rgb(110, 115, 121);

  .block {
    display: flex;
    flex-direction: column;
  }

  .basic-info {
    padding: 36px;
    box-shadow: rgb(38 78 118 / 10%) 0px 6px 50px;
  }

  .mr-30 {
    margin-right: 30px;
  }

  .count-down {
    display: flex;
    flex-direction: column;
  }

  .title {
    color: rgb(15, 33, 55);
    font-size: 2.2rem;
    line-height: 44px;
    font-weight: 700;
    margin-bottom: 27px;
  }

  .count-down-text {
    margin-top: 20px;
    margin-bottom: 36px;
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

  .carousell {
    background-color: rgba(237, 237, 240);
    height: 500px;
    width: 100%;
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

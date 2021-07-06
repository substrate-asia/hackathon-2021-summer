import styled from 'styled-components';

export const CustomerTrackingWrapper = styled.section`
  position: relative;
  padding-bottom: 120px;

  @media (max-width: 767px) {
    padding-bottom: 80px;
  }

  .container {
    max-width: 1200px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .column {
    flex: 1 1 50%;

    @media (max-width: 991px) {
      flex: 1 1 100%;
    }
    img {
      @media (max-width: 991px) {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  .d-flex {
    display: flex;
  }
  .my-auto {
    margin: auto;
  }

  .content {
    padding-left: 74px;
    @media (max-width: 991px) {
      padding-left: 0;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      max-width: 700px;
      padding-top: 30px;
    }
  }

  h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    margin: 0;
    margin-bottom: 15px;
    letter-spacing: -0.01em;
    text-transform: capitalize;
    color: #c36276;
  }
  h3 {
    margin: 0;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 1.333;
    letter-spacing: -0.04em;
    color: #0f2137;
    margin-bottom: 20px;

    @media (max-width: 575px) {
      font-size: 30px;
    }

    @media (max-width: 375px) {
      font-size: 28px;
    }
  }
  p {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 2;
    color: #0f2137;
    margin-bottom: 30px;
  }
  .exploreLink {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: -0.02em;
    line-height: 1;
    color: #3183ff;
    transition: all 500ms ease;

    &:hover {
      color: #c36276;
    }
    i {
      position: relative;
      top: -1px;
    }
  }
`;

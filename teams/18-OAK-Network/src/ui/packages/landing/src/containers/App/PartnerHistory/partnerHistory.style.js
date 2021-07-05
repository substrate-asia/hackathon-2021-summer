import styled from 'styled-components';

const PartnerHistoryWrapper = styled.section`
  padding: 240px 0 160px;
  position: relative;
  overflow: hidden;
  @media (max-width: 1440px) {
    padding: 200px 0 80px;
  }
  @media screen and (max-width: 1100px) and (min-width: 992px) {
    padding: 80px 0 60px;
  }
  @media (max-width: 990px) {
    padding: 20px 0 120px;
  }
  @media (max-width: 480px) {
    padding: 0px 0 60px;
  }
  .feature__block {
    padding-right: 90px;
    @media (max-width: 990px) {
      padding-right: 0px;
    }
    .reusecore__button {
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.85;
      }
    }
  }
  .backgroungImg {
    position: absolute;
    top: 80px;
    right: 40px;
    z-index: -1;
    pointer-events: none;
    @media (max-width: 1600px) {
      right: -220px;
      top: 80px;
    }
    @media (max-width: 1100px) {
      display: none;
    }
  }
`;

const CounterUpArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
  @media (max-width: 990px) {
    margin-top: 50px;
    padding-left: 0;
    margin-left: -25px;
  }
  @media (max-width: 400px) {
    margin-left: 0px;
  }
  .card {
    width: calc(50% - 25px);
    margin-left: 25px;
    margin-bottom: 27px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: box-shadow 0.3s ease-in-out;
    z-index: 1;
    background: #fff;
    cursor: pointer;
    @media (max-width: 480px) {
      padding: 20px;
    }
    @media (max-width: 360px) {
      width: 100%;
      margin-left: 0;
    }

    &:hover {
      box-shadow: 0px 16px 35px 0px rgba(16, 66, 97, 0.1);
    }

    img {
      height: 100px;
      @media (max-width: 1440px) {
        height: 80px;
      }
      @media (max-width: 990px) {
        height: 50px;
      }
    }

    p {
      color: #172a43;
      font-size: 20px;
      line-height: 40px;
      font-weight: 500;
      margin-bottom: 7px;
      margin-top: 30px;
      @media (max-width: 991px) {
        display: none;
      }
      @media (max-width: 767px) {
        display: block;
      }
      @media (max-width: 460px) {
        font-size: 16px;
        margin-top: 5px;
        text-align: center;
      }
    }

    &:nth-child(even) {
      position: relative;
      top: 22px;
      @media (max-width: 400px) {
        top: 0px;
      }
    }
  }
`;

export { CounterUpArea };
export default PartnerHistoryWrapper;

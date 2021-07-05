import styled from 'styled-components';

import illustration from 'common/assets/image/hostingModern/illustration2.png';

const SectionWrapper = styled.section`
  position: relative;
  margin-bottom: -110px;
  z-index: 10;
`;

export const Content = styled.div`
  background: #362c8b url(${illustration}) no-repeat 66% center;
  border-radius: 15px;
  padding: 40px 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    padding: 30px 45px;
  }
  @media only screen and (max-width: 767px) {
    flex-wrap: wrap;
  }
  h3 {
    color: #fff;
    font-family: 'Bree Serif', serif;
    font-weight: 400;
    font-size: 36px;
    line-height: 55px;
    letter-spacing: -0.5px;
    max-width: 52%;
    @media only screen and (max-width: 768px) {
      font-size: 26px;
      line-height: 48px;
    }
    @media only screen and (max-width: 767px) {
      font-size: 24px;
      line-height: 40px;
      max-width: none;
    }
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #fff;
    color: #183656;
    margin: 15px 0;
  }
`;

export default SectionWrapper;

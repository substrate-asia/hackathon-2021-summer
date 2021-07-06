import styled from 'styled-components';

export const TestimonialWrapper = styled.div`
  .glide__track {
    padding: 30px 0;
    margin: 0 -10px;
    padding: 10px;
  }
  .glide__slides {
    overflow: initial;
  }
  .glide__controls {
    position: absolute;
    top: -115px;
    right: 0;
    z-index: 1;
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

export const TestimonialItem = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0.521px 2.954px 20px 0px rgba(101, 106, 160, 0.1);

  .reviewer_org {
    font-size: 14px;
    color: #3444f1;
    margin-left: 0.4em;
  }
`;

export const TestimonialHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  a {
    color: #d6d7e2;
    transition: 0.15s ease-in-out;
    &:hover {
      color: #38a1f3;
    }
  }
`;

export const TestimonialThumb = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: -5.818px 10.495px 50px 0px rgba(101, 106, 160, 0.43);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

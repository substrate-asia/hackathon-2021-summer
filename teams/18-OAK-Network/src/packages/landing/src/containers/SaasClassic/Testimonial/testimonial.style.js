import styled from 'styled-components';

export const TestimonialSlideWrapper = styled.div`
  .glide__bullets {
    margin-top: 45px;
    text-align: center;
    @media (max-width: 575px) {
      margin-top: 30px;
    }
    .glide__bullet {
      width: 12px;
      height: 12px;
      background: #e7f1ed;
      margin: 5px;
      transition: 0.15s ease-in-out;
      &:hover {
        background: #d8e2de;
      }
      &.glide__bullet--active {
        background: #c9cecc;
      }
    }
  }
`;

export const TestimonialItem = styled.div`
  position: relative;
  display: block;
  background: #fff;
  border: 1px solid #f2f4f7;
  border-radius: 5px;
  padding: 40px;

  @media (max-width: 575px) {
    padding: 30px;
  }
`;

export const TestimonialMeta = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const AuthorImage = styled.div`
  width: 50px;
  height: 50px;
  flex-basis: 50px;
  display: block;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 6px 30px 0px rgba(39, 79, 117, 0.2);
  margin-right: 15px;
  @media (max-width: 575px) {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
  }
`;

import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const GalleryWrapper = styled.div`
  padding: 0 0 160px;
  background: linear-gradient(#ffffff, #fbfafe);
  display: flex;
  @media only screen and (max-width: 1440px) {
    padding: 0 0 150px;
  }
  @media only screen and (max-width: 767px) {
    padding: 42px 0;
    flex-wrap: wrap;
  }

  .glide {
    position: relative;

    .glide__track {
      overflow: inherit;
      .glide__slides {
        overflow: inherit;
        > li {
          margin-top: -40px;
          @media only screen and (max-width: 767px) {
            margin-top: 0;
          }

          &:nth-child(even) {
            margin-top: 0;
          }
        }
      }
    }

    .glide__controls {
      margin: 0;

      .glide__prev--area,
      .glide__next--area {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${themeGet('colors.primary', '#FDEF00')};
        position: absolute;
        top: calc(50% - 20px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        @media only screen and (max-width: 767px) {
          opacity: 1;
          visibility: visible;
        }
        i {
          font-size: 16px;
          line-height: 1;
          font-weight: 700;
        }
      }

      .glide__prev--area {
        left: 30px;
        box-shadow: -1px 2px 0 rgba(0, 0, 0, 0.1);
      }

      .glide__next--area {
        right: 30px;
        box-shadow: 1px 2px 0 rgba(0, 0, 0, 0.1);
      }
    }

    &:hover {
      .glide__controls {
        .glide__prev--area,
        .glide__next--area {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }
`;

export const GalleryCard = styled.div`
  position: relative;

  a {
    display: block;
    overflow: hidden;
    position: relative;
    box-shadow: 0 30px 70px 10px rgba(25, 25, 25, 0.19);
    @media only screen and (max-width: 767px) {
      box-shadow: 0 5px 30px 5px rgba(25, 25, 25, 0.19);
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 130px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.82));
      transition: all 0.3s ease;
    }

    img {
      transform: scale(1);
      transition: all 0.3s ease;
    }

    &:hover {
      &::after {
        height: 70%;
      }

      img {
        transform: scale(1.03);
      }

      .read_more__btn {
        color: ${themeGet('colors.primary', '#FDEF00')};

        .arrow {
          width: 28px;
          left: calc(100% + 10px);
          border-radius: 4px;
          background-color: ${themeGet('colors.primary', '#FDEF00')};

          &::before {
            transform: rotate(-42deg);
            transform-origin: top right;
            background-color: ${themeGet('colors.primary', '#FDEF00')};
          }

          &::after {
            transform: rotate(42deg);
            transform-origin: 10px 2px;
            background-color: ${themeGet('colors.primary', '#FDEF00')};
          }
        }
      }
    }
  }
`;

export const Button = styled.button`
  &.read_more__btn {
    border: 0;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    bottom: 35px;
    left: 35px;
    font-size: 22px;
    font-weight: 600;
    text-transform: capitalize;
    color: ${themeGet('colors.label', '#C6C6C6')};
    z-index: 2;

    @media only screen and (max-width: 1440px) {
      font-size: 18px;
    }

    @media only screen and (max-width: 1200px) {
      font-size: 16px;
    }

    &:focus {
      outline: 0;
    }
  }
`;

export default GalleryWrapper;

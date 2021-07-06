import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const VideoSectionWrapper = styled.section`
  padding: 80px 0;
  overflow: hidden;

  @media (max-width: 990px) {
    padding: 60px 0;
  }
  @media (max-width: 767px) {
    padding: 30px 0 60px 0;
  }

  .figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    img {
      border-radius: 4px;
    }

    .fig__caption {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;

      .reusecore__button {
        .btn-icon {
          background-color: ${themeGet('colors.white', '#ffffff')};
          line-height: 0.4;
        }
      }
    }
  }
`;

export default VideoSectionWrapper;

import styled from 'styled-components';

const SectionWrapper = styled.section`
  padding: 81px 0;
  overflow: hidden;
  @media only screen and (max-width: 1440px) {
    padding: 60px 0;
  }
  @media only screen and (max-width: 767px) {
    padding: 42px 0 12px;

    header {
      padding: 0 30px 40px;
    }
  }
  @media only screen and (max-width: 480px) {
    padding-bottom: 30px;
  }
`;

export const FeatureWrapper = styled.div`
  display: flex;
  margin: 0 -71.5px;
  @media only screen and (max-width: 1360px) {
    margin: 0 -25px;
  }
  @media only screen and (max-width: 767px) {
    flex-wrap: wrap;
  }

  .blog_post {
    padding: 0 71.5px;
    text-align: center;
    @media only screen and (max-width: 1360px) {
      padding: 0 25px;
    }
    @media only screen and (max-width: 767px) {
      width: 50%;
      margin-bottom: 30px;
    }
    @media only screen and (max-width: 480px) {
      text-align: left;
      display: flex;
      width: 100%;
    }

    .thumbnail {
      margin: 30px 0 40px;
      @media only screen and (max-width: 1360px) {
        margin: 0 0 27px;
        img {
          width: 90px;
          height: auto;
        }
      }
      @media only screen and (max-width: 480px) {
        margin: 0;
        width: 60px;
        flex-shrink: 0;
      }
    }

    .content {
      @media only screen and (max-width: 480px) {
        width: calc(100% - 60px);
        padding-left: 20px;
      }
      h3 {
        margin: 0 0 16px;
        @media only screen and (max-width: 1360px) {
          font-size: 20px;
          margin: 0 0 12px;
        }
        @media only screen and (max-width: 480px) {
          line-height: 34px;
          margin-bottom: 7px;
        }
      }
      p {
        margin: 0;
      }
    }
  }
`;

export default SectionWrapper;

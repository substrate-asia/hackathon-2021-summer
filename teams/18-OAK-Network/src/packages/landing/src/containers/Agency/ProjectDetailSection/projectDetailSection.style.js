import styled from 'styled-components';

const ProjectDetailWrapper = styled.section`
  font-size: 1.1rem;
  color: rgb(110, 115, 121);
  text-align: left;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    margin-bottom: 24px;

    > * {
      margin-bottom: 18px;
    }
  }

  .social-media {
    color: rgb(209, 57, 124);
    margin-bottom: 36px;

    > * {
      margin-right: 18px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .charts {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .chart {
    flex: 1;
  }

  .team-members {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-bottom: 30px;

    > * {
      margin-bottom: 18px;
    }

    .member-profile {
      width: 125px;
      height: 125px;
      border-radius: 50%;
      background-position: center;
      background-size: contain;
    }
    .member-name {
      font-size: 1.2rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 12px;
    }
    .member-role {
      font-weight: 500;
    }
  }

  // @media only screen and (max-width: 1440px) {
  //   .charts {
  //     flex-direction: column;
  //   }
  // }
`;

export default ProjectDetailWrapper;

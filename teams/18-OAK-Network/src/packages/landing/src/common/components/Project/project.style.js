import styled from 'styled-components';

const ProjectStyle = styled.a`
  font-size: 1.1rem;
  color: rgb(110, 115, 121);
  text-align: left;

  .title {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 24px;
    white-space: nowrap;
    overflow: hidden;
  }

  .description {
    margin-bottom: 24px;
    min-height: 9rem;
  }

  .attribute {
    font-size: 1rem;
    margin-bottom: 36px;
  }

  .action {
    text-align: right;
  }

  @media only screen and (max-width: 600px) {
    .username {
      margin-left: 0px;
      margin-top: 10px;
    }

    .created {
      margin-top: 5px;
      margin-left: 0px;
    }
  }
`;

ProjectStyle.displayName = 'ProjectStyle';

export default ProjectStyle;

import styled from 'styled-components';

const ProjectDetailWrapper = styled.section`
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  div.buttons {
    margin-top: 20px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .button {
    border: 0;
    margin-left: 10px;
    background-color: white;
  }

  .ml-5 {
    margin-left: 5px;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .mt-15 {
    margin-top: 15px;
  }

  .mt-30 {
    margin-top: 30px;
  }

  .ml-10 {
    margin-left: 10px;
  }

  .text-center {
    text-align: center;
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
  }

  .member {
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    align-items: center;
    max-width: 100px;
  }

  .photo {
    border-radius: 10px;
    width: 70px;
    height: 70px;
    border: 1px solid black;
  }

  // @media only screen and (max-width: 1440px) {
  //   .charts {
  //     flex-direction: column;
  //   }
  // }
`;

export default ProjectDetailWrapper;

import styled from 'styled-components';

export const SkillItem = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0.521px 2.954px 50px 0px rgba(101, 106, 160, 0.1);
`;

export const SkillDetails = styled.div`
  padding: 85px 60px 55px 60px;
  display: flex;
  align-items: center;
  @media (max-width: 1199px) {
    padding: 70px 45px 40px 45px;
  }
  @media (max-width: 990px) {
    padding: 60px 35px 30px 35px;
  }
  @media (max-width: 575px) {
    padding: 35px 25px 20px 25px;
  }
`;

export const SkillIcon = styled.div`
  flex: 0 0 130px;
  max-width: 130px;
  @media (max-width: 990px) {
    flex: 0 0 55px;
    max-width: 55px;
    margin-right: 30px;
  }
  @media (max-width: 575px) {
    flex: 0 0 45px;
    max-width: 45px;
    margin-right: 20px;
  }
`;

export const SkillAbout = styled.div``;

export const SkillProgress = styled.div`
  padding: 20px 50px 28px 50px;
  border-top: 1px solid #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1199px) {
    padding: 20px 30px 28px 30px;
  }
  @media (max-width: 575px) {
    padding: 15px 20px 18px 20px;
  }
`;

export const SuccessRate = styled.div`
  display: flex;
  align-items: center;
  .skill_success_icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #407fff;
    overflow: hidden;
    line-height: 18px;
    text-align: center;
    color: #fff;
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

export const ProgressBar = styled.div`
  flex: 0 0 58%;
  max-width: 58%;
  @media (max-width: 1199px) {
    flex: 0 0 70%;
    max-width: 70%;
  }

  > svg {
    vertical-align: middle;
  }
`;

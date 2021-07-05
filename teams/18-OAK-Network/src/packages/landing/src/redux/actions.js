const actions = {
  INCREASE: 'INCREASE',
  SET_ACCOUNT: 'SET_ACCOUNT',
  SET_PROJECTS: 'SET_PROJECTS',
  
  increase: (text) => ({
    type: actions.INCREASE,
    text
  }),
  setAccount: (account) => ({
    type: actions.SET_ACCOUNT,
    account
  }),
  setProjects: (projects) => ({
    type: actions.SET_PROJECTS,
    projects
  })
};

export default actions;

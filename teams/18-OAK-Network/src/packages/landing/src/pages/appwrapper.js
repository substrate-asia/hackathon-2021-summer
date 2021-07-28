import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import backend from '../common/backend';
import actions from '../redux/actions';
import reduxHelper from '../redux/helper';

const AppWrapper = ({ children, setAccount }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(async () => {
    const account = window.localStorage.getItem('account');
    console.log('AppWrapper, account: ', account);
    if (account) {
      setAccount(account);
    }
    backend.initialize();
    await backend.login();
    await reduxHelper.getProjects();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <div>{children}</div>;
};

const mapDispatchToProps = (dispatch) => ({
  setAccount: (account) => dispatch(actions.setAccount(account)),
});

export default connect(null, mapDispatchToProps)(AppWrapper);

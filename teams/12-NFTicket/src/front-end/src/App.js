import './App.css';
import Routes from './router';
import {Switch,BrowserRouter, BrowserRouter as Router} from 'react-router-dom';

import Bottomtab from './component/BottomTab/BottomTab';
import Store from './store/Index';

import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Switch>
          <Router>
            <Routes></Routes>
            <Bottomtab></Bottomtab>
          </Router>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
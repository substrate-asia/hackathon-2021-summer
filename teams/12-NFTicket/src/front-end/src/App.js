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

// import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';

// const prompt = Modal.prompt;

// function App(){
//   return (
//     <WingBlank size="lg">
//     <WhiteSpace size="lg" />
//     <Button onClick={() => Modal.operation([
//       { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
//       { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
//     ])}
//     >operation</Button>
//     <WhiteSpace size="lg" />
//   </WingBlank>
// );
// }


// export default App;
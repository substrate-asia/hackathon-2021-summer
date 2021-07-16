import './scss/custom.scss';
import Header from './components/header';
import Maincontain from './components/maincontain';

import { SubstrateContextProvider} from './api/contracts';

function App() {
  return (
      <SubstrateContextProvider>
    <div className="App">
        <div className="width80">
            <Header />
            <Maincontain />
        </div>
    </div>
      </SubstrateContextProvider>
  );
}

export default App;

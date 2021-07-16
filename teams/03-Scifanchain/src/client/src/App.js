import React from 'react';
import { BrowserRouter as Router,} from 'react-router-dom'
import { RecoilRoot} from 'recoil';

import Navigation from './Navigation';
import Content from './Content';

// import Demo from './Demo'

export default function App() {
    
  return (
    <RecoilRoot>
      <Router>
        {<Navigation />}
        {<Content />}
        {/* {<Demo />} */}
      </Router>
    </RecoilRoot>
  );
}
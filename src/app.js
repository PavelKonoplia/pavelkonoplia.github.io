import * as React from 'react';
import './app.css';

import MainComponent from './components/main.component';

import { BrowserHistory } from './store';

const ConnectedRouter = require('react-router-redux').ConnectedRouter;

class App extends React.Component {

  render() {
    console.log(ConnectedRouter);
    debugger
    return (
      
      <ConnectedRouter history={BrowserHistory} >
        <MainComponent />
      </ConnectedRouter >
    );
  }
}

export default App;

import * as React from 'react';
import './app.css';

import CreateItemComponent from './components/operations/create-item.component';
import MainComponent from './components/main.component';

class App extends React.Component {
  render() {
    return (
      <MainComponent />
    );
  }
}

export default App;

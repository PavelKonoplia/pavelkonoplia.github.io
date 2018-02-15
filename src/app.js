import * as React from 'react';
import './app.css';

import CreateItemComponent from './components/operations/create-item.component';

class App extends React.Component {
  render() {
    return (
      <CreateItemComponent />
    );
  }
}

export default App;

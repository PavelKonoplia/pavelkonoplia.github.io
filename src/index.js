import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import ItemsReducer from './reducers/items.reducer';
import {Store} from './store';

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root'));   
registerServiceWorker();

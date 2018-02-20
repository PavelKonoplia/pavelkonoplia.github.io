import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import { createStore } from 'redux';

import ItemsReducer from './reducers/items.reducer';

// Create store
const Store = createStore(ItemsReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.getElementById('root'));   
registerServiceWorker();

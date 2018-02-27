import { createStore, applyMiddleware } from 'redux';
//import { Store } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import ItemsReducer from '../reducers/items.reducer';
import { ItemsReducerState } from '../reducers/items.reducer';

// Create a history 
const BrowserHistory = createHistory();

// Create store
const Store = createStore(
    ItemsReducer, new ItemsReducerState(), composeWithDevTools(
        applyMiddleware(routerMiddleware(BrowserHistory))));

export { Store, BrowserHistory };
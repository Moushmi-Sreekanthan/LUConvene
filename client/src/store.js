import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from './reducer';

const initialState = {};
const history = createHistory()
const middleware = [promise, thunk, routerMiddleware(history)]
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__
      ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
      : [])
  )
)

export default store;

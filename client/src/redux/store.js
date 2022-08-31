import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './reducers/usersRedux';
import adsReducer from './reducers/adsRedux';

const rootReducer = combineReducers({
  user: usersReducer,
  ads: adsReducer,
});

const store = legacy_createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);

export default store;

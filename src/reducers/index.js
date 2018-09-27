import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userSettings from './userSettings';
import cards from './cards';
import results from './results';

export default combineReducers({
  userSettings,
  cards,
  results,
  router: routerReducer
});

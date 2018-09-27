import { Map } from 'immutable';

import {
  CHANGE_FIRSTNAME,
  CHANGE_SECONDNAME,
  CHANGE_EMAIL,
  CHANGE_CARDSBACK,
  CHANGE_DIFFICULTY
} from '../constants';

const initialState = Map({
  firstName: 'John',
  secondName: 'Connor',
  email: 'johnconnor@gmail.com',
  cardsBackId: 1,
  difficultyId: 6
});

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FIRSTNAME:
      return state.set('firstName', action.payload);
    case CHANGE_SECONDNAME:
      return state.set('secondName', action.payload);
    case CHANGE_EMAIL:
      return state.set('email', action.payload);
    case CHANGE_CARDSBACK:
      return state.set('cardsBackId', +action.payload);
    case CHANGE_DIFFICULTY:
      return state.set('difficultyId', +action.payload);
    default:
      return state;
  }
}

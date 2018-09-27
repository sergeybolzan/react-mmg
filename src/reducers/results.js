import { Map, List } from 'immutable';

import { GET_RESULTS_SUCCESS, GET_RESULTS_FAILURE } from '../constants';

const initialState = Map({
  results: List(),
  error: null
});

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESULTS_SUCCESS:
      return state.set('results', List(action.payload.sort((a, b) => b.score - a.score)));
    case GET_RESULTS_FAILURE:
      return state.merge({'results': List(), 'error': action.payload });
    default:
      return state;
  }
}

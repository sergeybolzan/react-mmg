import axios from 'axios';

import {
  OPTIONS,
  CHANGE_FIRSTNAME,
  CHANGE_SECONDNAME,
  CHANGE_EMAIL,
  CHANGE_CARDSBACK,
  CHANGE_DIFFICULTY,
  INIT_CARDS,
  FLIP_CARD,
  CHECK_CARDS,
  CHECK_IS_WIN,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_FAILURE,
  UPDATE_SCORE
} from '../constants';

export const changeFirstName = text => ({
  type: CHANGE_FIRSTNAME,
  payload: text
});

export const changeSecondName = text => ({
  type: CHANGE_SECONDNAME,
  payload: text
});

export const changeEmail = text => ({
  type: CHANGE_EMAIL,
  payload: text
});

export const changeCardsBack = id => ({
  type: CHANGE_CARDSBACK,
  payload: id
});

export const changeDifficulty = id => ({
  type: CHANGE_DIFFICULTY,
  payload: id
});

export const initCards = id => ({
  type: INIT_CARDS,
  payload: id
});

export const flipCard = id => ({
  type: FLIP_CARD,
  payload: id
});

export const checkCards = id => ({
  type: CHECK_CARDS,
  payload: id
});

export const flipAndCheckCardsWithTimeout = id => {
  return dispatch => {
    dispatch(flipCard(id));

    setTimeout(() => {
      dispatch(checkCards(id));
    }, OPTIONS.CHECK_CARDS_DELAY);
  };
};

export const checkIsWin = () => ({
  type: CHECK_IS_WIN
});

export const checkIsWinWithTimeout = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(checkIsWin());
    }, OPTIONS.CHECK_WIN_DELAY);
  };
};

export const getResultsSuccess = results => ({
  type: GET_RESULTS_SUCCESS,
  payload: results
});

export const getResultsFailure = error => ({
  type: GET_RESULTS_FAILURE,
  payload: error
});

export const getResultsFromAPI = () => {
  return async dispatch => {
    try {
      const response = await axios.get(OPTIONS.API_ENDPOINT);
      dispatch(getResultsSuccess(response.data.result));
    } catch (error) {
      dispatch(getResultsFailure(error));
    }
  };
};

export const sendResultToAPI = (username, email, score) => {
  return async dispatch => {
    try {
      await axios.post(OPTIONS.API_ENDPOINT, {
        username,
        email,
        score
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateScore = score => ({
  type: UPDATE_SCORE,
  payload: score
});

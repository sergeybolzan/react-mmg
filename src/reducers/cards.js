import { FLIP_CARD, INIT_CARDS, CHECK_CARDS, CHECK_IS_WIN, UPDATE_SCORE } from '../constants';

let idCounter = 1;

const initialState = {
  cardsList: [],
  isDisabledClickOnCards: false,
  score: 100,
  isWinGame: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_CARDS:
      return initCardsArray(state, action);

    case FLIP_CARD:
      let cardsList = state.cardsList.map(item => {
        if (item.id === action.payload) {
          item.isFlipped = !item.isFlipped;
        }
        return item;
      });
      return { ...state, cardsList, isDisabledClickOnCards: true};

    case CHECK_CARDS:
      const flippedCards = state.cardsList.filter(item => item.isFlipped && !item.isHidden);
      if (flippedCards.length >= 2) {
        if (flippedCards[0].pairId === flippedCards[1].pairId) {
          cardsList = state.cardsList.map(item => {
            if (item.pairId === flippedCards[0].pairId) {
              item.isHidden = true;
            }
          return item;
          });
        } else {
          cardsList = state.cardsList.map(item => {
            if (item.id === flippedCards[0].id || item.id === flippedCards[1].id) {
              item.isFlipped = !item.isFlipped;
            }
            return item;
          });
        }
        return { ...state, cardsList, isDisabledClickOnCards: false }
      }
      return { ...state, isDisabledClickOnCards: false }

    case CHECK_IS_WIN:
      const notHiddenCards = state.cardsList.find(item => !item.isHidden);
      if (!notHiddenCards) {
        return { ...state, isWinGame: true };
      }
      return state;

    case UPDATE_SCORE:
      return { ...state, score: action.payload };

    default:
      return state;
  }
}

function initCardsArray(state, action) {
  const difficultyId = action.payload;
  let numbersArray = Array(difficultyId / 2)
    .fill(0)
    .map((value, index, array) => index + 1);
  numbersArray = numbersArray.concat(numbersArray);
  numbersArray.sort(() => Math.random() - 0.5);

  return { 
    ...state, 
    isWinGame: false, 
    score: 100, 
    cardsList: numbersArray.map(value => {
      return {
        id: idCounter++,
        pairId: value,
        isFlipped: false,
        isHidden: false,
      };
    })
  };
}

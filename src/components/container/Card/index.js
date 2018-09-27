import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import {
  flipAndCheckCardsWithTimeout,
  checkIsWinWithTimeout
} from '../../../actions';

class Card extends Component {
  handleClickCard = () => {
    const {
      card,
      isDisabledClickOnCards,
      flipAndCheckCardsWithTimeout,
      checkIsWinWithTimeout
    } = this.props;

    if (!card.isFlipped && !isDisabledClickOnCards) {
      flipAndCheckCardsWithTimeout(card.id);
      checkIsWinWithTimeout();
    }
  };

  render() {
    const { card, cardsBackId } = this.props;

    return (
      <div
        className={'card' + (card.isHidden ? ' hideCard' : '')}
        style={{ width: this.getCardWidth(), height: this.getCardHeight() }}
      >
        <figure
          onClick={this.handleClickCard}
          className={card.isFlipped ? 'selected' : ''}
        >
          <span className={'cardBack back-img-' + cardsBackId} />
          <span className={'cardFront front-img-' + card.pairId} />
        </figure>
      </div>
    );
  }

  getCardWidth() {
    const { difficultyId } = this.props;
    if (difficultyId === 6) {
      return '33.33%';
    }
  }

  getCardHeight() {
    const { difficultyId } = this.props;
    if (difficultyId === 6) {
      return '40%';
    }
    if (difficultyId === 12) {
      return '30%';
    }
  }
}

Card.propTypes = {
  cardsBackId: PropTypes.number.isRequired,
  difficultyId: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  isDisabledClickOnCards: PropTypes.bool.isRequired,
  flipAndCheckCardsWithTimeout: PropTypes.func.isRequired,
  checkIsWinWithTimeout: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    cardsBackId: state.userSettings.get('cardsBackId'),
    difficultyId: state.userSettings.get('difficultyId'),
    cards: state.cards.cardsList,
    isDisabledClickOnCards: state.cards.isDisabledClickOnCards
  }),
  { flipAndCheckCardsWithTimeout, checkIsWinWithTimeout }
)(Card);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import './index.css';
import Card from '../../container/Card';
import Score from '../../container/Score';
import { initCards, sendResultToAPI } from '../../../actions';

class Game extends Component {
  handleButtonClick = () => {
    this.props.history.push('/');
  };

  async componentDidUpdate() {
    const { isWinGame, score, history, sendResultToAPI, firstName, secondName, email } = this.props;

    if (isWinGame === true) {
      const username = firstName + ' ' + secondName;
      await sendResultToAPI(username, email, score);
      history.push('results');
    }
  }

  render() {
    const { cards } = this.props;

    if (!cards.length) {
      return <Redirect to="/" />;
    }

    return (
      <div className="game">
        <div className="wrapper">
          <header>
            <Score />
            <button
              className="refresh-page-button"
              onClick={this.handleButtonClick}
            >
              New game
            </button>
          </header>
          <div className="cards">
            {cards.map(item => <Card key={item.id} card={item} />)}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.array.isRequired,
  isWinGame: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  initCards: PropTypes.func.isRequired,
  sendResultToAPI: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    cards: state.cards.cardsList,
    isWinGame: state.cards.isWinGame,
    score: state.cards.score,
    firstName: state.userSettings.get('firstName'),
    secondName: state.userSettings.get('secondName'),
    email: state.userSettings.get('email'),
  }),
  { initCards, sendResultToAPI }
)(Game);

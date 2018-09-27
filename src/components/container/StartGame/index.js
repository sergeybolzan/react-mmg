import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import Rules from '../../presentational/Rules';
import UserSettingsInputs from '../../container/UserSettingsInputs';
import CardsBackSelection from '../../container/CardBackSelection';
import DifficultySelection from '../../container/DifficultySelection';
import User from '../../../utils/User';
import { initCards } from '../../../actions';

class StartGame extends Component {
  componentWillUnmount() {
    const { firstName, secondName, email, cardsBackId, difficultyId } = this.props;
    const user = new User(firstName, secondName, email, cardsBackId, difficultyId);
    localStorage.setItem('react-match-match-game-user', JSON.stringify(user));
  }

  handleButtonClick = () => {
    this.props.initCards(this.props.difficultyId);
    this.props.history.push('/game');
  }
  
  render() {
    return (
      <div className="start-game modal">
        <div className="wrapper">
          <Rules />
          <div className="user-settings">
            <h3 className="helper">Enter your name:</h3>
            <UserSettingsInputs />
            <CardsBackSelection />
            <DifficultySelection />
          </div>
          <div className="start-button-wrapper">
          <button onClick={this.handleButtonClick}>Start new game</button>
          </div>
        </div>
      </div>
    );
  }
}

StartGame.propTypes = {
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cardsBackId: PropTypes.number.isRequired,
  difficultyId: PropTypes.number.isRequired,
  initCards: PropTypes.func.isRequired,
};

export default connect(state => ({
  firstName: state.userSettings.get('firstName'),
  secondName: state.userSettings.get('secondName'),
  email: state.userSettings.get('email'),
  cardsBackId: state.userSettings.get('cardsBackId'),
  difficultyId: state.userSettings.get('difficultyId'),
}), { initCards })(StartGame);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import cardBackImage1 from './images/back1.png';
import cardBackImage2 from './images/back2.png';
import cardBackImage3 from './images/back3.png';
import { changeCardsBack } from '../../../actions';

class CardsBackSelection extends Component {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('react-match-match-game-user'));
    if (user) {
      this.props.changeCardsBack(user.cardsBackId);
    }
  }

  handleChange = event => {
    this.props.changeCardsBack(event.target.value);
  };

  render() {
    const { cardsBackId } = this.props;

    return (
      <div className="card-back-selection">
        <h3>Cards back:</h3>
        <select
          id="cardsBack"
          className="cardsBack"
          onChange={this.handleChange}
          value={cardsBackId}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <div className="cardsBackVariants">
          <div className="wrapper">
            <img src={cardBackImage1} alt="Card back 1" />
            <span>1</span>
          </div>
          <div className="wrapper">
            <img src={cardBackImage2} alt="Card back 2" />
            <span>2</span>
          </div>
          <div className="wrapper">
            <img src={cardBackImage3} alt="Card back 3" />
            <span>3</span>
          </div>
        </div>
      </div>
    );
  }
}

CardsBackSelection.propTypes = {
  cardsBackId: PropTypes.number.isRequired,
  changeCardsBack: PropTypes.func.isRequired,
};

export default connect(
  state => ({ cardsBackId: state.userSettings.get('cardsBackId') }),
  { changeCardsBack }
)(CardsBackSelection);

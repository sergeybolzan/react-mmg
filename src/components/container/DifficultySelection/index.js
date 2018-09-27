import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import { changeDifficulty } from '../../../actions';

class DifficultySelection extends Component {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('react-match-match-game-user'));
    if (user) {
      this.props.changeDifficulty(user.difficultyId);
    }
  }
  
  handleChange = event => {
    this.props.changeDifficulty(event.target.value);
  };

  render() {
    const { difficultyId } = this.props;

    return (
      <div className="difficulty-selection">
        <h3>Game difficulty:</h3>
        <select
          id="gameDifficulty"
          className="gameDifficulty"
          onChange={this.handleChange}
          value={difficultyId}
        >
          <option value="6">Easy</option>
          <option value="12">Medium</option>
          <option value="16">Hard</option>
        </select>
      </div>
    );
  }
}

DifficultySelection.propTypes = {
  difficultyId: PropTypes.number.isRequired,
  changeDifficulty: PropTypes.func.isRequired,
};

export default connect(
  state => ({ difficultyId: state.userSettings.get('difficultyId') }),
  { changeDifficulty }
)(DifficultySelection);

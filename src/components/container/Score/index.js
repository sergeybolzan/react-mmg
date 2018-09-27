import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import { updateScore } from '../../../actions';

class Score extends Component {
  componentDidMount() {
    const intervalId = setInterval(this.timer, 1000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    const { score, updateScore, difficultyId } = this.props;

    let factor = 1;
    if (difficultyId === 6) factor = 5;
    if (difficultyId === 12) factor = 2;

    const newCount = score - factor;
    if (newCount >= 0) {
      updateScore(newCount);
    } else {
      clearInterval(this.state.intervalId);
    }
  };

  render() {
    return <span className="score">Score: {this.props.score}</span>;
  }
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  difficultyId: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    score: state.cards.score,
    difficultyId: state.userSettings.get('difficultyId')
  }),
  { updateScore }
)(Score);

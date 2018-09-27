import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import { getResultsFromAPI } from '../../../actions';

class Results extends Component {
  handleButtonClick = () => {
    this.props.history.push('/');
  };

  componentDidMount() {
    this.props.getResultsFromAPI();
  }

  render() {
    const { results, error, score, cards } = this.props;
    
    return (
      <div className="end-game modal">
        <div className="wrapper">
        
          {cards.length ? (
            <div>
              <h2>Congratulations!</h2>
              <div className="result-score" id="result-score">
                Your score is {score}
              </div>
            </div>
          ) : (
            ''
          )}

          <h4>HiGH SCORES:</h4>

          {error ? (
            <div>Error! {error.message}</div>
          ) : (
            <div className="results-table">
              <table>
                <tbody>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Score</th>
                  </tr>
                  {results.map(item => (
                    <tr key={item._id}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            className="refresh-page-button"
            onClick={this.handleButtonClick}
          >
            New game
          </button>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  results: PropTypes.object.isRequired,
  error: PropTypes.object,
  score: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  getResultsFromAPI: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    results: state.results.get('results'),
    error: state.results.get('error'),
    score: state.cards.score,
    cards: state.cards.cardsList
  }),
  { getResultsFromAPI }
)(Results);

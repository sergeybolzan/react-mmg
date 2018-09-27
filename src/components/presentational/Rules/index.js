import React from 'react';

import './index.css';
import startGamePeopleImage from './images/start-game-people.png';

const Rules = () => {
  return (
    <div className="rules">
      <div className="container">
        <div className="flex-wrapper">
          <div className="rule-text-left">
            <h3>About game:</h3>
            <p>
              Match-Match Game is a card game in which the player must find
              pairs of pictures.<br />When the game begins, all pictures are
              hidden.
            </p>
          </div>
          <img src={startGamePeopleImage} alt="People" />
          <div className="rule-text-right">
            <h3>To Play:</h3>
            <ol>
              <li>Select two cards to find a pair of pictures.</li>
              <li>If the cards match, they disappear.</li>
              <li>If the cards don't match, they flip back.</li>
              <li>If all pairs are found, the player wins!</li>
              <li>Have Fun!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;

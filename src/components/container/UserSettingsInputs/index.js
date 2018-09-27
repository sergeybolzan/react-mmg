import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import {
  changeFirstName,
  changeSecondName,
  changeEmail
} from '../../../actions';

class UserSettingsInputs extends Component {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('react-match-match-game-user'));
    if (user) {
      this.props.changeFirstName(user.firstName);
      this.props.changeSecondName(user.lastName);
      this.props.changeEmail(user.email);
    }
  }

  changeFirstName = event => {
    this.props.changeFirstName(event.target.value);
  };

  changeSecondName = event => {
    this.props.changeSecondName(event.target.value);
  };

  changeEmail = event => {
    this.props.changeEmail(event.target.value);
  };

  render() {
    const { firstName, secondName, email } = this.props;

    return (
      <div className="user-settings-inputs">
        <input
          type="text"
          placeholder="First name"
          onChange={this.changeFirstName}
          value={firstName}
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={this.changeSecondName}
          value={secondName}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={this.changeEmail}
          value={email}
        />
      </div>
    );
  }
}

UserSettingsInputs.propTypes = {
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  changeFirstName: PropTypes.func.isRequired,
  changeSecondName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    firstName: state.userSettings.get('firstName'),
    secondName: state.userSettings.get('secondName'),
    email: state.userSettings.get('email')
  }),
  { changeFirstName, changeSecondName, changeEmail }
)(UserSettingsInputs);

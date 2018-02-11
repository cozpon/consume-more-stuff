import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../actions/auth.actions';

const crypto = require('crypto');

class Reset extends Component {
  constructor() {
    super();

    this.state = {
      password : '',
      redirect : false, // set initial state to false
    };

    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handlePasswordReset(evt) {
    evt.preventDefault();
    console.log('YO');
    let resetPassword = {
      password : this.state.password,
    };

    this.props.resetPassword(resetPassword);

    this.setState({
      password : '',
    });
  }

  handlePasswordInput(evt) {
    this.setState(
    {
      password : evt.target.value,
    });
  }

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return(
      <div id="login-container">
        <h2>reset Password</h2>

        <div>
          <center>
            .: so u 4got ur password, no big deal :.
          </center>
        </div>

        <div className="login-form">
          <form className="inner-form-container" onSubmit={this.handlePasswordReset.bind(this)}>
            <div className="form-header">
            just enter a new one in below
            </div>
         <div>
            <input
              name="password"
              type="text"
              placeholder="enter new password"
              defaultValue={this.state.password}
              onChange={this.handleEmailInput} />
            </div>
            <div>
            <input
              name="password"
              type="text"
              placeholder="re-enter new password"
              defaultValue={this.state.password}
              onChange={this.handleEmailInput} />
            </div>
            <button
              className="login-btn"
              type="submit"
              onClick={this.handlePasswordReset}>
              Change Ur Password
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// maps store state to local props
const mapStateToProps = (state) => {
  return {
    singleUser : state.singleUser
  };
};

//maps store dispatch to local props
const mapDispatchToProps = (dispatch) => {
  return{
    resetPassword: (resetPasswordConfirm) => {
      dispatch(resetPassword(resetPasswordConfirm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reset);
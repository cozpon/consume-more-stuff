import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../actions/auth.actions';


class Reset extends Component {
  constructor() {
    super();

    this.state = {
      password : '',
      token: '',
      redirect : false, // set initial state to false
    };

    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handlePasswordReset(evt) {
    evt.preventDefault();
    let newPassword = {
      password : this.state.password,
      token: this.props.match.params.token

    };

    this.props.resetPassword(newPassword);

    this.setState({
      password : '',
      token: ''
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
              onChange={this.handlePasswordInput} />
            </div>
            <div>
            <input
              name="password"
              type="text"
              placeholder="re-enter new password"
              defaultValue={this.state.password}
              onChange={this.handlePasswordInput} />
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
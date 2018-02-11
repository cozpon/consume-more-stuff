import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { forgotPassword } from '../../actions/auth.actions';


class Forgot extends Component {
  constructor() {
    super();

    this.state = {
      email : '',
      redirect : false, // set initial state to false
    };

    this.handlePasswordRecovery = this.handlePasswordRecovery.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handlePasswordRecovery(evt) {
    evt.preventDefault();
    let forgotPasswordEmail = {
      email : this.state.email,
      redirect: true,
    };
    this.props.forgotPassword(forgotPasswordEmail);

    this.setState({
      email : '',
    });
  }

  handleEmailInput(evt) {
    this.setState(
    {
      email : evt.target.value,
    });
  }

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return(
      <div id="login-container">
        <h2>Forgot Password</h2>
        <div>
          <center>
            .: Oh noes, that's ok, just enter email below :.
          </center>
        </div>

        <div className="login-form">
          <form className="inner-form-container" onSubmit={this.handlePasswordRecovery.bind(this)}>
            <div className="form-header">
            Enter EMAIL Associated With Your Account
            </div>
         <div>
            <input
              name="email"
              type="text"
              placeholder="email"
              defaultValue={this.state.email}
              onChange={this.handleEmailInput} />
            </div>
            <button
              className="login-btn"
              type="submit"
              onClick={this.handlePasswordRecovery}>
              Send Recovery Email
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
    forgotPassword: (forgotPasswordEmail) => {
      dispatch(forgotPassword(forgotPasswordEmail));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forgot);
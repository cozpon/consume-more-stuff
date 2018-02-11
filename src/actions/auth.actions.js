import Axios from 'axios';

const register = '/api/auth/register';
const login = '/api/auth/login';
const logout = '/api/auth/logout';
const forgot = '/api/auth/forgot';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOT_PASS = 'FORGOT_PASS';
export const ERROR = 'ERROR';

export const registerUser = (registerCreds) => {
  return (dispatch) => {
    return Axios.post(register, registerCreds)
    .then(response => {
        dispatch({
          type: REGISTER_USER,
          response: response.data
       });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


export const loginUser = (userCreds) => {
  return (dispatch) => {
    return Axios.post(login, userCreds)
    .then((response) => {
      // console.log(response, "RESPONSE DATA");
      dispatch({
        type: LOGIN_USER,
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'invalid user name or password'
      });
    });
  };
};

export const forgotPassword = (userEmail) => {
  console.log(userEmail, "UUUUEMAIL");
  return (dispatch) => {
    return Axios.post(forgot, userEmail)
    .then((response) => {
      console.log(response, "RESPONSE DATA");
      dispatch({
        type: FORGOT_PASS,
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // console.log(dispatch, "logout");
    return Axios.get(logout)
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: LOGOUT_USER,
          success: response.data.success
        });
      }
    })
    .catch((err) => {
      console.log('Logout Failed. Please try again', err);
      return false;
    });
  };
};

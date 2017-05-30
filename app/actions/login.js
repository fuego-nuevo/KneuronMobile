import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const requestLogin = creds => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  creds,
});

const receiveLogin = user => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});

const loginError = message => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message,
});

const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: true,
  isAuthenticated: true,
});

const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
  isFetching: false,
  isAuthenticated: false,
});

exports.loginUser = (creds) => {
  console.log('This is Creds: ', creds);
  return (dispatch) => {
    dispatch(requestLogin(creds));

    return axios.get(`http://localhost:8080/api/students/${creds.email}/${creds.password}`)
      .then((response) => {
        console.log('this is asnycstorage 60!!!!!!!!!!!!!', AsyncStorage);
        console.log(response);
        if (!response.data) {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
        }
        AsyncStorage.setItem('id_token', response.data.id_token);
        // AsyncStorage.setItem('access_token', response.data.id_token);
        dispatch(receiveLogin(response.data));
        console.log('before dashboard');
        console.log(AsyncStorage, 'this is asnycstorage 60!!!!!!!!!!!!!')
        console.log('this is the token when they signup', AsyncStorage.getItem('id_token'));
        Actions.home({ type: ActionConst.RESET });
        console.log('after dashboard');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};

exports.signupUser = (creds) => {
  console.log('this is the request in signup line 62 ', creds);
  const body = {
    email: creds.email,
    password: creds.password,
    userType: 1,
    fName: creds.fName,
    lName: creds.lName,
    username: creds.username,
  };
  return (dispatch) => {
    dispatch(requestLogin(creds));

    return axios.post('http://localhost:8080/api/students', body)
      .then((response) => {
        console.log("this is the response in 89 of signup!!!!!!", response);
        if (!response.data) {
          dispatch(loginError('Bad Request...'));
          console.log('user did not sign up succesfully');
          return Promise.reject(response);
        }
        AsyncStorage.setItem('id_token', response.data.id_token);
        console.log('this is the token when they signup', AsyncStorage.getItem('id_token'))
        dispatch(receiveLogin(response.data));
        console.log('user did sign up succesfully');
        Actions.home();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};


exports.logoutUser = () => {
  console.log('yooo logout ran');
  return (dispatch) => {
    console.log('got into dispatch line 96 action/login.js')
    dispatch(requestLogout());
    console.log('got past the dispatch');
    AsyncStorage.removeItem('id_token');
    dispatch(receiveLogout());
    Actions.login();
    console.log('did you receive logout');
  };
};
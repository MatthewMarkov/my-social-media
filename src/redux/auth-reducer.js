import { stopSubmit } from 'redux-form';
import { authAPI } from '../API/API';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';


const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  photo: null,
  url: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_USER_PHOTO:
      return {
        ...state,
        photo: action.photo,
      };
    case GET_CAPTCHA_URL:
      return {
        ...state,
        url: action.url,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (id, login, email, isAuth) => ({
  type: SET_USER_DATA,
  data: {
    id, login, email, isAuth,
  },
});
export const setAuthUserPhoto = (photo) => ({ type: SET_USER_PHOTO, photo });
export const putCaptchaUrl = (url) => ({ type: GET_CAPTCHA_URL, url });

export const signIn = () => async (dispatch) => {
  const response = await authAPI.authMe();
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await authAPI.getCaptcha();
  dispatch(putCaptchaUrl(response.data.url));
};

export const logIn = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(signIn());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
    dispatch(stopSubmit('auth', { _error: errorMessage }));
  }
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};


export default authReducer;

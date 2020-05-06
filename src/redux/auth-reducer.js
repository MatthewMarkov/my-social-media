import { stopSubmit } from 'redux-form';
import { authAPI } from '../API/API';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';


const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  photo: null,

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

export const signIn = () => (dispatch) => authAPI.authMe().then((response) => {
  if (response.data.resultCode === 0) {
    const { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
});

export const logIn = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(signIn());
    } else {
      const errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
      dispatch(stopSubmit('auth', { _error: errorMessage }));
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};


export default authReducer;

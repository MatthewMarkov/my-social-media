import { stopSubmit } from 'redux-form';
import { authAPI } from '../API/API';
import { CommonThunkType, GlobalActionTypes} from './redux-store';


const initialState = {
  id: null as any,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean | null,
  url: null as string | null,
};
type initialStateType = typeof initialState
type ActionTypes = GlobalActionTypes<typeof ActionCreators>
type ThunkType = CommonThunkType<ActionTypes>

const authReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.data,
      };
    case 'GET_CAPTCHA_URL':
      return {
        ...state,
        url: action.url,
      };

    default:
      return state;
  }
};

// Action Creators
export const ActionCreators = {
  setAuthUserData: (
    id: number | null, login: string | null, email: string | null, isAuth: boolean,
  ) => ({
    type: 'SET_USER_DATA',
    data: {
      id, login, email, isAuth,
    },
  } as const),
  putCaptchaUrl: (url: string) => ({ type: 'GET_CAPTCHA_URL', url } as const),

};
// Thunks
export const signIn = (): ThunkType => async (dispatch) => {
  const response = await authAPI.authMe();
  if (response.resultCode === 0) {
    const { id, login, email } = response.data;
    dispatch(ActionCreators.setAuthUserData(id, login, email, true));
  }
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const response = await authAPI.getCaptcha();
  dispatch(ActionCreators.putCaptchaUrl(response.url));
};
export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string | null):
    ThunkType => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.resultCode === 0) {
    dispatch(signIn());
  } else {
    if (response.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const errorMessage = response.messages.length > 0 ? response.messages[0] : 'Some error';
    // @ts-ignore
    dispatch(stopSubmit('auth', { _error: errorMessage }));
  }
};
export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === 0) {
    dispatch(ActionCreators.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

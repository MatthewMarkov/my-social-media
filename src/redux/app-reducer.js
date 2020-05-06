import { signIn } from './auth-reducer';

const INITIALIZE_USER = ' INITIALIZE_USER';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_USER:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializeUser = () => ({ type: INITIALIZE_USER });

export const initializeApp = () => async (dispatch) => {
  await dispatch(signIn());
  await dispatch(initializeUser());
};


export default appReducer;

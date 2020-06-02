import { signIn } from './auth-reducer';
import { CommonThunkType, GlobalActionTypes} from './redux-store';


type initialStateType = {
  initialized: boolean
}

const initialState: initialStateType = {
  initialized: false,
};
type ActionTypes = GlobalActionTypes<typeof ActionCreators>
type ThunkType = CommonThunkType<ActionTypes>

const appReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'INITIALIZE_USER':
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};
// Action Creators
export const ActionCreators = {
  initializeUser: () => ({ type: 'INITIALIZE_USER' } as const),
};
// Thunks
export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(signIn());
  await dispatch(ActionCreators.initializeUser());
};


export default appReducer;

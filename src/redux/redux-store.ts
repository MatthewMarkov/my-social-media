import {
  Action,
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

type ActionCreatorsTypes<T> = T extends {[key: string] : infer U } ? U : never
export type GlobalActionTypes<T extends {[key: string] : (...arg: any[]) => any }> = ReturnType<ActionCreatorsTypes<T>>
export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction< R, appStateType, unknown, A >


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// @ts-ignore
export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
import { reset } from 'redux-form';
import { dialogsAPI } from '../API/API';
import { dialogType, messageType, newMessageType } from './reducerTypes';
import { CommonThunkType, GlobalActionTypes } from './redux-store';

const initialState = {
  dialogs: [] as Array<dialogType>,
  messages: [] as Array<messageType>,
  isFetching: false,
};

type initialStateType = typeof initialState
type ActionTypes = GlobalActionTypes<typeof ActionCreators>
type ThunkType = CommonThunkType<ActionTypes>

const dialogsReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'GET_DIALOGS':
      return {
        ...state,
        dialogs: [...state.dialogs, ...action.dialogs],
      };
    case 'UPLOAD_DIALOG':
      return {
        ...state,
        messages: [...action.messages],
      };
    case 'IS_FETCHING':
      return {
        ...state, isFetching: action.boolean,
      };
    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return state;
  }
};
export const ActionCreators = {
  getUserDialogs: (dialogs: Array<dialogType>) => (
    { type: 'GET_DIALOGS', dialogs } as const),

  setDialog: (messages: Array<messageType>) => (
    { type: 'UPLOAD_DIALOG', messages } as const),

  isFetching: (boolean: boolean) => (
    { type: 'IS_FETCHING', boolean } as const),

  sendMessageAC: (message: newMessageType) => (
    { type: 'SEND_MESSAGE', message } as const),

};

// Thunks
export const getDialogs = (): ThunkType => async (dispatch) => {
  const response = await dialogsAPI.getDialogs();
  dispatch(ActionCreators.isFetching(true));
  dispatch(ActionCreators.getUserDialogs(response.data));
};
export const getExactDialog = (id: number): ThunkType => async (dispatch) => {
  dispatch(ActionCreators.isFetching(false));
  const response = await dialogsAPI.geExactDialog(id);
  await dispatch(ActionCreators.setDialog(response.data.items));
  dispatch(ActionCreators.isFetching(true));
};
export const startChatting = (id: number): ThunkType => async (dispatch) => { // непонятно что диспатчить
  const response = await dialogsAPI.startChatting(id);
};
export const updateViewedStatus = (messageId: string): ThunkType => async (dispatch) => { // Получаем true/false, пока не понятно куда диспатчить
  const response = await dialogsAPI.viewedMessage(messageId);
};
export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch) => {
  const response = await dialogsAPI.sendMessage(userId, message);
  if (response.resultCode === 0) {
    dispatch(ActionCreators.sendMessageAC(response.data.message));
    // @ts-ignore
    dispatch(reset('dialog'));
    dispatch(startChatting(userId));
  }
};


export default dialogsReducer;

import { stopSubmit } from 'redux-form';
import { profileAPI } from '../API/API';
import { photosType, postType, profileType } from './reducerTypes';
import { CommonThunkType, GlobalActionTypes} from './redux-store';

const initialState = {
  posts: [
    { id: 1, message: 'how are you?', likesCount: 12 },
    { id: 2, message: 'Its my first post', likesCount: 15 },
    { id: 3, message: 'How are you?', likesCount: 10 },
    { id: 4, message: 'Whats`s new?', likesCount: 11 },
    { id: 5, message: 'Whats up?', likesCount: 17 },
    { id: 6, message: 'Good morning', likesCount: 16 },
  ] as Array<postType>,
  profile: null as profileType | null,
  status: '',
  statusError: null as string | null,
};
type initialStateType = typeof initialState

type ActionTypes = GlobalActionTypes<typeof ActionCreators>
type ThunkType = CommonThunkType<ActionTypes>

const profileReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, { id: 5, message: action.post, likesCount: 0 }],
      };
    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    case 'GET_STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'SET_STATUS_ERROR':
      return {
        ...state,
        statusError: action.error,
      };
    case 'UPDATE_USER_PHOTO':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as profileType,
      };
    default:
      return state;
  }
};
 export const ActionCreators = {
  addPost: (post: string) => (
    { type: 'ADD_POST', post } as const),
  setUserProfile: (profile: profileType) => (
    { type: 'SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => (
    { type: 'GET_STATUS', status } as const),
  updateUserPhoto: (photos: photosType) => (
    { type: 'UPDATE_USER_PHOTO', photos } as const),
  setStatusError: (error: string | null) => (
    { type: 'SET_STATUS_ERROR', error } as const),
};


// Thunks
export const getProfile = (userID: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getUserProfile(userID);
  dispatch(ActionCreators.setUserProfile(response));
};
export const getStatus = (userID: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getStatus(userID);
  dispatch(ActionCreators.setStatus(response));
};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(ActionCreators.setStatus(status));
    dispatch(ActionCreators.setStatusError(null));
  } else if (response.resultCode === 1) {
    const error = response.messages[0];
    dispatch(ActionCreators.setStatusError(error));
  }
};
export const updateUserInformation = (userData: profileType): ThunkType => async (
  dispatch, getState) => {
  const response = await profileAPI.updateUserProfileInformation(userData);
  const userID = getState().auth.id;
  if (response.resultCode === 0) {
    dispatch(getProfile(userID));
  } else {
    // @ts-ignore
    dispatch(stopSubmit('contacts', { _error: response.data.messages[0] }));
  }
};
export const saveUserPhoto = (photo: any): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(photo);
  if (response.resultCode === 0) {
    dispatch(ActionCreators.updateUserPhoto(response.photos));
  }
};

export default profileReducer;

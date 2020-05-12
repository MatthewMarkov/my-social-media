import { stopSubmit } from 'redux-form';
import { profileAPI } from '../API/API';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = 'SET_STATUS';
const UPDATE_USER_PHOTO = 'UPDATE_USER_PHOTO';

const initialState = {
  posts: [
    { id: 1, message: 'how are you?', likesCount: 12 },
    { id: 2, message: 'Its my first post', likesCount: 15 },
    { id: 3, message: 'How are you?', likesCount: 10 },
    { id: 4, message: 'Whats`s new?', likesCount: 11 },
    { id: 5, message: 'Whats up?', likesCount: 17 },
    { id: 6, message: 'Good morning', likesCount: 16 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, { id: 5, message: action.post, likesCount: 0 }],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case GET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_USER_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    default:
      return state;
  }
};

export const addPost = (post) => ({ type: ADD_POST, post });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: GET_STATUS, status });

export const updateUserPhoto = (photos) => ({ type: UPDATE_USER_PHOTO, photos });


export const getProfile = (userID) => (dispatch) => {
  profileAPI.getUserProfile(userID).then((response) => {
    dispatch(setUserProfile(response.data));
  });
};
export const getStatus = (userID) => (dispatch) => {
  profileAPI.getStatus(userID).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
export const updateUserInformation = (userData) => async (dispatch, getState) => {
  profileAPI.updateUserProfileInformation(userData).then((response) => {
    const userID = getState().auth.id;
    if (response.data.resultCode === 0) {
      dispatch(getProfile(userID));
    } else {
      dispatch(stopSubmit('contacts', { _error: response.data.messages[0] }));
    }
  });
};

export const saveUserPhoto = (photo) => (dispatch) => {
  profileAPI.savePhoto(photo).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(updateUserPhoto(response.data.data.photos));
    }
  });
};

export default profileReducer;
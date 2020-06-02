import { usersAPI } from '../API/API';
import { userType } from './reducerTypes';
import { CommonThunkType, GlobalActionTypes } from './redux-store';

const initialState = {
  users: [] as Array<userType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};
type initialStateType = typeof initialState
type ActionTypes = GlobalActionTypes<typeof ActionCreators>
type ThunkType = CommonThunkType<ActionTypes>

const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case 'SET_USERS':
      return {
        ...state, users: action.users,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state, currentPage: action.currentPage,
      };
    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state, totalUsersCount: action.count,
      };
    case 'IS_TOGGLE_FETCHING':
      return {
        ...state, isFetching: action.isFetching,
      };
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id !== action.userID),
      };
    case 'FILTER_USERS':
      return {
        ...state, users: action.users,
      };

    default:
      return state;
  }
};
// Action Creators
export const ActionCreators = {
  followAC: (userID: number) => (
      { type: 'FOLLOW', userID } as const),
  unfollowAC: (userID: number) => (
      { type: 'UNFOLLOW', userID } as const),
  setUsers: (users: Array<userType>) => (
      { type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage:number) => (
      { type: 'SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalCount: number) => (
      { type: 'SET_TOTAL_USERS_COUNT', count: totalCount } as const),
  isToggleFetching: (isFetching: boolean) => (
      { type: 'IS_TOGGLE_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching: boolean, userID: number) => (
      { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const),
  filterUsers: (users: any) => ({ type: 'FILTER_USERS', users } as const),
};

// Thunks
export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
  dispatch(ActionCreators.isToggleFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(ActionCreators.isToggleFetching(false));
  dispatch(ActionCreators.setUsers(data.items));
  dispatch(ActionCreators.setTotalUsersCount(data.totalCount));
};
export const changePage = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
  try {
    dispatch(ActionCreators.setCurrentPage(currentPage));
    dispatch(ActionCreators.isToggleFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(ActionCreators.isToggleFetching(false));
    dispatch(ActionCreators.setUsers(data.items));
  } catch (e) {
    alert(e);
  }
};
export const follow = (userID: number): ThunkType => async (dispatch) => {
  dispatch(ActionCreators.toggleFollowingProgress(true, userID));
  const response = await usersAPI.follow(userID);
  if (response.data.resultCode === 0) {
    dispatch(ActionCreators.followAC(userID));
  }
  dispatch(ActionCreators.toggleFollowingProgress(false, userID));
};
export const unfollow = (userID: number): ThunkType => async (dispatch) => {
  dispatch(ActionCreators.toggleFollowingProgress(true, userID));
  const response = await usersAPI.unfollow(userID);
  if (response.data.resultCode === 0) {
    dispatch(ActionCreators.unfollowAC(userID));
  }
  dispatch(ActionCreators.toggleFollowingProgress(false, userID));
};
export const filterUsers = (value: string): ThunkType => async (dispatch) => {
  const data = await usersAPI.getUsersForSearch(value);
  dispatch(ActionCreators.filterUsers(data.items));
};


export default usersReducer;

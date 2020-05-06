import { usersAPI } from '../API/API';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_TOGGLE_FETCHING = 'IS_TOGGLE_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],

};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_USERS:
      return {
        ...state, users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state, totalUsersCount: action.count,
      };
    case IS_TOGGLE_FETCHING:
      return {
        ...state, isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id != action.userID),
      };

    default:
      return state;
  }
};

export const followAC = (userID) => ({ type: FOLLOW, userID });

export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID });

export const setUsers = (users) => ({ type: SET_USERS, users });

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalCount });

export const isToggleFetching = (isFetching) => ({ type: IS_TOGGLE_FETCHING, isFetching });

export const toggleFollowingProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID });

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(isToggleFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(isToggleFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
};

export const changePage = (currentPage, pageSize) => async (dispatch) => {
  dispatch(setCurrentPage(currentPage));
  dispatch(isToggleFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(isToggleFetching(false));
  dispatch(setUsers(data.items));
};

export const follow = (userID) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userID));
  const response = await usersAPI.follow(userID);
  if (response.data.resultCode === 0) {
    dispatch(followAC(userID));
  }
  dispatch(toggleFollowingProgress(false, userID));
};
export const unfollow = (userID) => async (dispatch) => {
  dispatch(toggleFollowingProgress(true, userID));
  const response = await usersAPI.unfollow(userID);
  if (response.data.resultCode === 0) {
    dispatch(unfollowAC(userID));
  }
  dispatch(toggleFollowingProgress(false, userID));
};


export default usersReducer;

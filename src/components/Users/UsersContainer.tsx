import React from 'react';
import { connect } from 'react-redux';
import {
  changePage,
  follow,
  getUsers,
  unfollow,
  filterUsers,
} from '../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingInProgress, getIsAuth, getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../HOC/selectors';
import Paginator from './Paginator';
import User from './User';
import { appStateType } from '../../redux/redux-store';
import { userType } from '../../redux/reducerTypes';


type MapStatePropsType = {
  users: Array<userType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  followingInProgress: Array<number>
  isFetching: boolean
  isAuth: boolean
}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  follow: (id: number) => void
  unfollow: (id: number) => void
  changePage: (pageNumber: number, pageSize: number) => void
  filterUsers: (value: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

    onPageChanged = (pageNumber: number) => {
      this.props.changePage(pageNumber, this.props.pageSize);
    };

    render() {
      const findUserHandler = (e: any) => {
        this.props.filterUsers(e.currentTarget.value);
      };
      return (
        <>
          <input type="search" placeholder="find current user" onChange={findUserHandler} />
          <Paginator
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            isFetching={this.props.isFetching}
          />
          {this.props.users.map((user) => (
            <User
              user={user}
              unfollow={this.props.unfollow}
              follow={this.props.follow}
              followingInProgress={this.props.followingInProgress}
              isAuth={this.props.isAuth}
            />
          ))}
        </>
      );
    }
}

const mapStateToProps = (state: appStateType): MapStatePropsType => ({
  users: getUsersSelector(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  followingInProgress: getFollowingInProgress(state),
  isFetching: getIsFetching(state),
  isAuth: getIsAuth(state),
});

export default connect<MapStatePropsType, MapDispatchPropsType, null, appStateType>(mapStateToProps, {
  getUsers,
  follow,
  unfollow,
  changePage,
  filterUsers,
})(UsersContainer);

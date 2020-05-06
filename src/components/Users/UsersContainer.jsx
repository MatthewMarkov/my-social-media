import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import {
  changePage,
  follow,
  getUsers,
  unfollow,
} from '../../redux/users-reducer';
import {
  getCurrentPage,
  getFollowingInProgress, getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from '../../HOC/selectors';


class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

    onPageChanged = (pageNumber) => {
      this.props.changePage(pageNumber, this.props.pageSize);
    };


    render() {
      return (
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
          isFetching={this.props.isFetching}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  users: getUsersSelector(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  followingInProgress: getFollowingInProgress(state),
  isFetching: getIsFetching(state),
});

export default connect(mapStateToProps, {
  getUsers,
  follow,
  unfollow,
  changePage,
})(UsersContainer);

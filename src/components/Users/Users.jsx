import React from 'react';
import User from './User';
import Paginator from './Paginator';

const Users = (props) => (
  <div>
    <Paginator
      totalUsersCount={props.totalUsersCount}
      pageSize={props.pageSize}
      isFetching={props.isFetching}
      currentPage={props.currentPage}
      onPageChanged={props.onPageChanged}
    />
    {props.users.map((user) => (
      <User
        user={user}
        followingInProgress={props.followingInProgress}
        unfollow={props.unfollow}
        follow={props.follow}
      />
    ))}
  </div>
);

export default Users;

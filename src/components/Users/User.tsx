import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';
import userPhoto from '../../assets/user.png';
import { userType } from '../../redux/reducerTypes';


type PropsType = {
  user: userType
  follow: (id: number) => void
  unfollow: (id: number) => void
  followingInProgress: Array<number>
  isAuth: boolean
}

const User: FC<PropsType> = ({
  user, unfollow, follow, followingInProgress, isAuth,
}) => (
  <div className={s.userItem}>
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              alt="user"
              src={user.photos.small != null ? user.photos.small : userPhoto}
              className={s.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed && isAuth
            && (
            <button
              type="button"
              disabled={followingInProgress.some(
                (id) => id === user.id,
              )}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
            )}
          {' '}
          {!user.followed && isAuth
            && (
            <button
              type="button"
              disabled={followingInProgress.some(
                (id) => id === user.id,
              )}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
            )}
        </div>
      </span>
      <div>{user.name}</div>
      <div>{user.status !== null && user.status}</div>
    </div>
  </div>
);

export default User;

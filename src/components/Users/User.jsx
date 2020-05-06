import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';
import userPhoto from '../../assets/user.png';

const User = ({ user, ...props }) => (
  <div>
    <div>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={
                      user.photos.small != null ? user.photos.small : userPhoto
                    }
              className={s.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              type="button"
              disabled={props.followingInProgress.some(
                (id) => id === user.id,
              )}
              onClick={() => {
                props.unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={props.followingInProgress.some(
                (id) => id === user.id,
              )}
              onClick={() => {
                props.follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>user.location.country</div>
          <div>user.location.city</div>
        </span>
      </span>
    </div>
  </div>
);

export default User;

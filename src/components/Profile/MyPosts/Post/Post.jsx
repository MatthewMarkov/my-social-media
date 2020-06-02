import React from 'react';
import s from './Post.module.css';
import userPhoto from '../../../../assets/user.png';


const Post = (props) => (
  <div>
    <div className={s.item}>
      <img src={userPhoto} />
      <div>{props.message}</div>
    </div>
    <span>
      likes
      {props.like}
    </span>
  </div>
);

export default Post;

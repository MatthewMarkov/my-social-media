import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.scss';
import userPhoto from '../../../assets/user.png';

type PropsType = {
    newMessagesCount: number
    wasOnline: string
    photo: string | null
    name: string
    id: number
}

const DialogItem: React.FC<PropsType> = (props) => {
  const dateAndTime = props.wasOnline.split('T');
  const time = dateAndTime[1].slice(0, 5);
  return (
    <div className={s.dialog}>
      <NavLink className={s.userPhoto} to={`/profile/${props.id}`}><img alt="user" src={props.photo || userPhoto} /></NavLink>
      <NavLink className={s.userName} to={`/dialog/${props.id}`}>{props.name}</NavLink>
      {props.newMessagesCount === 0 ? null : (
        <div className={s.newMessage}>
          You have
          {props.newMessagesCount}
          {' '}
          new messages
        </div>
      ) }
      <div className={s.lastActivity}>
        Last activity:
        {' '}
        {dateAndTime[0]}
        {' '}
        at
        {' '}
        {time}
      </div>
    </div>
  );
};


export default DialogItem;

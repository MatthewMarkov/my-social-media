import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './Header.module.scss';
import vkLogo from '../../assets/vk-1.svg';

const Header = (props) => (
  <header className={s.header}>
    <img alt="logo" src={vkLogo} />
    <div className={s.box}>
      {props.profile !== null && props.id === props.profile.userId
      && <img alt="user" className={s.userImg} src={props.profile.photos.small} />}
    </div>
    {props.isAuth
      ? (
        <div className={s.box}>
          {props.login}
          <div>
            <button type="submit" onClick={props.logout}>Logout</button>
          </div>
          {' '}
        </div>
      )
      : <NavLink className={cn(s.box, s.link)} to="/login">Login</NavLink>}
  </header>
);

export default Header;

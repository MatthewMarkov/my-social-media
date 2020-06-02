import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { logout } from '../../redux/auth-reducer';
import s from './Header.module.scss';
import vkLogo from '../../assets/vk-1.svg';
import userPhoto from './../../assets/user.png'

const Header = (props) => (
  <header className={s.header}>
    <img alt="logo" src={vkLogo} />
    <div className={s.box}>
      {props.profile !== null && props.id === props.profile.userId && props.profile.photos.small !== null
        ? <img alt="user" className={s.userImg} src={props.profile.photos.small} />
        : <img alt="user" className={s.userImg} src={userPhoto} />}
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  profile: state.profilePage.profile,
  id: state.auth.id,
});
export default connect(mapStateToProps, { logout })(Header);

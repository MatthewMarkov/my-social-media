import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from '../../redux/auth-reducer';

function HeaderContainer(props) {
  return (
    <Header {...props} />
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  profile: state.profilePage.profile,
  id: state.auth.id,
});
export default connect(mapStateToProps, { logout })(HeaderContainer);

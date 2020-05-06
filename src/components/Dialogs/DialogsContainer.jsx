import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { sentMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {withAuthRedirectHoc} from '../../HOC/HOC';

function DialogContainer(props) {
  return <Dialogs {...props} />;
}

const mapStateToProps = (state) => ({
  state: state.dialogsPage,
  isAuth: state.auth.isAuth,
});
export default compose(connect(mapStateToProps, { sentMessage }), withAuthRedirectHoc)(DialogContainer);

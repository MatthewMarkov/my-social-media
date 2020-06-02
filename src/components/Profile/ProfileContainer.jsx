import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
  getProfile, getStatus, saveUserPhoto, updateStatus,
} from '../../redux/profile-reducer';
import { sendMessage } from '../../redux/dialogs-reducer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let { userID } = this.props.match.params;
    if (!userID) {
      userID = this.props.authID;
      if (!userID) {
        this.props.history.push('/login');
      }
    }
    this.props.getProfile(userID);
    this.props.getStatus(userID);
  }

  render() {
    return (
      <div>
        <ProfileInfo
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          sendMessage={this.props.sendMessage}
          isOwner={!this.props.match.params.userID}
          isAuth={this.props.isAuth}
        />
        <MyPostsContainer isOwner={!this.props.match.params.userID} />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authID: state.auth.id,
  isAuth: state.auth.isAuth,
  statusError: state.profilePage.statusError,
});

export default compose(connect(mapStateToProps, {
  getProfile, getStatus, updateStatus, saveUserPhoto, sendMessage,
}), withRouter)(ProfileContainer);

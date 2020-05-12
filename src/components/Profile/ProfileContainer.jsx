import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Profile from './Profile';
import {getProfile, getStatus, saveUserPhoto, updateStatus} from '../../redux/profile-reducer';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let { userID } = this.props.match.params;
    if (!userID) {
      userID = this.props.authID;
      if (!userID) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfile(userID);
    this.props.getStatus(userID);
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner = {!this.props.match.params.userID}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authID: state.auth.id,
});

export default compose(connect(mapStateToProps, { getProfile, getStatus, updateStatus, saveUserPhoto }), withRouter)(ProfileContainer);

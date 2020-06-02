import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirectHoc } from '../../HOC/HOC';
import { getDialogs, sendMessage } from '../../redux/dialogs-reducer';
import DialogItem from './dialogItem/DialogItem';
import Loader from '../Loader/Loader';
import { dialogType } from '../../redux/reducerTypes';
import { appStateType } from '../../redux/redux-store';

type MapStateToProps = {
  isFetching: boolean
  dialogs: Array<dialogType>
  isAuth: boolean | null
}
type MapDispatchToProps = {
  getDialogs: () => void
}

class Dialogs extends React.Component<MapStateToProps & MapDispatchToProps> {
  componentDidMount() {
    if (this.props.dialogs.length === 0) { this.props.getDialogs(); }
  }

  render() {
    const dialogElements = this.props.dialogs.map(
      (dialog) => (
        <DialogItem
          newMessagesCount={dialog.newMessagesCount}
          wasOnline={dialog.lastUserActivityDate}
          photo={dialog.photos.small}
          name={dialog.userName}
          id={dialog.id}
        />
      ),
    );
    return (
      <div>
        {this.props.isFetching ? dialogElements : <Loader /> }
      </div>
    );
  }
}
const mapStateToProps = (state: appStateType): MapStateToProps => ({
  isFetching: state.dialogsPage.isFetching,
  dialogs: state.dialogsPage.dialogs,
  isAuth: state.auth.isAuth,
});
export default compose<React.ComponentType>(connect<MapStateToProps, MapDispatchToProps, null, appStateType>(
  mapStateToProps, { getDialogs },
), withAuthRedirectHoc)(Dialogs);
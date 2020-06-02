import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import cn from 'classnames';
import s from './Dialog.module.scss';
import {
  getExactDialog, startChatting, updateViewedStatus, sendMessage,
} from '../../redux/dialogs-reducer';
import Loader from '../Loader/Loader';
import { messageType } from '../../redux/reducerTypes';
import { appStateType } from '../../redux/redux-store';

type MapStateToProps = {
    isFetching: boolean
    messages: Array<messageType>
}
type MapDispatchToProps = {
    getExactDialog: (id: number) => void
    startChatting: () => void
    sendMessage: (uerId: number, data: any) => void
    updateViewedStatus: () => void
}
type OwnProps = {
    match: {
        isExact: boolean
        path: string
        url: string
        params: {
            id: number
        }
    }
}


class Dialog extends React.Component<MapStateToProps & MapDispatchToProps & OwnProps> {
  componentDidMount() {
    this.props.getExactDialog(this.props.match.params.id);
  }

  render() {
    const userID: number = this.props.match.params.id;
    const addNewMessage = (formData: any) => {
      this.props.sendMessage(userID, formData);
    };

    return (
      <div>
        <div>
          {this.props.isFetching ? <Messages messages={this.props.messages} /> : <Loader /> }
        </div>
        <div>
          <DialogFormRedux onSubmit={addNewMessage} />
        </div>
      </div>
    );
  }
}
type MessagesPropsType = { messages: Array<messageType> }
const Messages: React.FC<MessagesPropsType> = (props): any => {
  const messages = props.messages.map((obj) => (
    <div className={s.messages}>
      <div>
        <NavLink className={s.senderName} to={`/profile/${obj.senderId}`}>{obj.senderName}</NavLink>
      </div>
      <div className={cn({ [s.notViewed]: !obj.viewed })}>{obj.body}</div>
    </div>
  ));
  return (
    messages
  );
};

const DialogForm = (props: any) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <Field name="body" component="textarea" type="text" />
    </div>
    <div>
      <button type="submit">Send</button>
    </div>
  </form>
);
const DialogFormRedux = reduxForm({ form: 'dialog' })(DialogForm);

const mapStateToProps = (state: appStateType) => ({
  isFetching: state.dialogsPage.isFetching,
  messages: state.dialogsPage.messages,
});

export default compose<React.ComponentType>(connect(mapStateToProps, {
  getExactDialog, startChatting, sendMessage, updateViewedStatus,
}), withRouter)(Dialog);

import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/LoginPage/Login';
import { initializeApp } from './redux/app-reducer';
import Loader from './components/Loader/Loader';
import { withSuspense } from './HOC/HOC';
import Dialog from "./components/Dialogs/Dialog";

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Loader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route exact path="/" render={() => <ProfileContainer />} />
          <Route exact path="/profile/:userID" render={() => <ProfileContainer />} />
          <Route exact path="/profile" render={() => <ProfileContainer />} />
          <Route exact path="/dialog/:id" render={() => <Dialog />} />
          <Route path="/users" render={withSuspense(UsersContainer)} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authInput, required } from '../Validation/validation';
import { logIn } from '../../redux/auth-reducer';
import s from '../Validation/validation.module.scss';

const LoginForm = ({ captchaUrl, ...props }) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="login" name="login" component={authInput} validate={[required]} />
      </div>
      <div>
        <Field placeholder="password" name="password" component={authInput} validate={[required]} />
      </div>
      {props.error && (
        <div className={s.errorBorder}>
          {props.error}
        </div>
      )}
      <div>
        <Field type="checkbox" name="rememberMe" component="input" />
        {' '}
        remember me
      </div>
      {captchaUrl != null && <img style={{ height: 100, width: 200 }} src={captchaUrl} />}
      <div>{captchaUrl != null && <Field type="text" component="input" placeholder="captcha text" name="captcha" validate={[required]} />}</div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

  </div>
);

const AuthForm = reduxForm({ form: 'auth' })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.logIn(formData.login, formData.password, formData.rememberMe, formData.captcha);
  };
  if (props.isAuth) { return <Redirect to="./profile" />; }
  return (
    <div>
      <h1>Login</h1>
      <AuthForm captchaUrl={props.url} onSubmit={onSubmit} />

    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  url: state.auth.url,
});

export default connect(mapStateToProps, { logIn })(Login);

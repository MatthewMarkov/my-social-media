import { Redirect } from 'react-router-dom';
import React from 'react';

export const withAuthRedirectHoc = (Component) => {
  const redirectComponent = (props) => {
    if (!props.isAuth) {
      return <Redirect to="/login" />;
    }
    return <Component {...props} />;
  };
  return redirectComponent;
};

export const withSuspense = (Component) => (props) => <React.Suspense fallback={<div>Loading...</div>}><Component {...props} /></React.Suspense>;

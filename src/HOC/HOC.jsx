import { Redirect } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

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


export const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      console.log('called back');
    });
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

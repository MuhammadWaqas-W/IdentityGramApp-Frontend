import React, { useEffect, useState } from 'react';
import { MainLoader } from '@components/molecules';
import { useAppDispatch } from '@hooks';
import {
  authActions,
  loginInWithToken,
  setAxiosInterceptors,
  handleAuthentication,
  isAuthenticated,
} from '@store';

export const AuthWrapper = ({ children }: { children: any }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setAxiosInterceptors({
        onLogout: () => dispatch(authActions.logout()),
      });
      handleAuthentication();
      if (isAuthenticated()) {
        // await dispatch(loginInWithToken());
      }
      setLoading(false);
    };
    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <MainLoader />;
  }

  return children;
};

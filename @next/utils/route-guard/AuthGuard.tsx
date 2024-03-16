import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useLocalStorage } from '@hooks';
import { GuardProps } from '@types';
import { REQUEST_STATUS } from '@constants';
import { ErrorDialog, LinearLoader } from '@molecules';

// ==============================|| AUTH GUARD ||============================== //

export const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { tokenLoginError } = useAppSelector(
    (state: { auth: any }) => state.auth,
  );
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS?.LOADING);

  // useEffect(() => {
  //   if (!accessToken) {
  //     router?.push('/auth/login');
  //     return;
  //   }
  //   setRequestStatus(REQUEST_STATUS?.IDEL);
  // }, [accessToken, router?.pathname]);

  // if (requestStatus === REQUEST_STATUS?.LOADING) return <LinearLoader />;

  // if (tokenLoginError) {
  //   return <ErrorDialog />;
  // }

  return children;
};

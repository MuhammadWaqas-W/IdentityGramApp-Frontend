import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@hooks';
import { GuardProps } from '@types';
import { REQUEST_STATUS } from '@constants';
import { LinearLoader } from '@molecules';

// ==============================|| GUEST GUARD ||============================== //

export const GuestGuard = ({ children }: GuardProps) => {
  const [accessToken] = useLocalStorage('accessToken', null);
  const router = useRouter();
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS?.LOADING);

  useEffect(() => {
    if (accessToken) {
      router?.push('/app/dashboard');
      return;
    }
    setRequestStatus(REQUEST_STATUS?.IDEL);
  }, [accessToken, router?.pathname]);

  if (requestStatus === REQUEST_STATUS?.LOADING) return <LinearLoader />;

  return children;
};

import React from 'react';
import { LoginOrganism } from '@components/organisms';
import { GuestLayout } from '@layouts';
import { CircleAnimation } from '@components/atoms';

export const Login = (): JSX.Element => (
  <React.Fragment>
    <CircleAnimation>
      <LoginOrganism />
    </CircleAnimation>
  </React.Fragment>
);

Login.getLayout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

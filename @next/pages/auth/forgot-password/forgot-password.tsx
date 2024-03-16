import React from 'react';
import { ForgotPasswordOrg } from '@components/organisms';
import { GuestLayout } from '@layouts';
import { CircleAnimation } from '@components/atoms';
export const ForgotPassword = (): JSX.Element => (
  <CircleAnimation>
    <ForgotPasswordOrg />
  </CircleAnimation>
);

ForgotPassword.getLayout = (page: React.ReactNode) => (
  <GuestLayout>{page}</GuestLayout>
);

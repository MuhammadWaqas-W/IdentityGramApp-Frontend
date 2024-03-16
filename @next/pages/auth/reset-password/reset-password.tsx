import React from 'react';
import { ResetPasswordOrg } from '@organisms';
import { GuestLayout } from '@layouts';
import { CircleAnimation } from '@components/atoms';

export const ResetPassword = () => {
  return (
    <CircleAnimation>
      <ResetPasswordOrg />
    </CircleAnimation>
  );
};
ResetPassword.getLayout = (page: React.ReactNode) => (
  <GuestLayout>{page}</GuestLayout>
);

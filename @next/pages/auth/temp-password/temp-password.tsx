import React from 'react';
import { TempPasswordOrg } from '@organisms';
import { GuestLayout } from '@layouts';
import { CircleAnimation } from '@components/atoms';

export const TempPassword = () => {
  return (
    <CircleAnimation>
      <TempPasswordOrg />
    </CircleAnimation>
  );
};
TempPassword.getLayout = (page: React.ReactNode) => (
  <GuestLayout>{page}</GuestLayout>
);

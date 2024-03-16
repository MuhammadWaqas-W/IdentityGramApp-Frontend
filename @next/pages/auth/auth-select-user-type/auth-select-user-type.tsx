import React from 'react';
import { AuthSelectUser } from '@components/organisms';
import { GuestLayout } from '@layouts';

export const SelectUserType = (): JSX.Element => (
  <React.Fragment>
    <AuthSelectUser />
  </React.Fragment>
);

SelectUserType.getLayout = (page: React.ReactNode) => (
  <GuestLayout>{page}</GuestLayout>
);

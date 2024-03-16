import React from 'react';
import { GuestLayout } from '@layouts';
import { SignupOrganism } from '@next/components/organisms/signup';

export const Signup = (): JSX.Element => (
  <React.Fragment>
    <SignupOrganism />
  </React.Fragment>
);

Signup.getLayout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>;

import { ReactElement } from 'react';

// ==============================|| AUTH TYPES  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  token?: string | null;
}

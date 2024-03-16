import { AppProps } from 'next/app';
import { NextPage } from 'next';

/**
 * Extends the NextPage type to add getLayout functionality.
 */
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: JSX.Element) => JSX.Element;
};
/**
 * Extends AppProps to have getLayout functionality
 */
export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

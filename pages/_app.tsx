import React from 'react';
import Head from 'next/head';
import ThemeCustomization from '@themes';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthWrapper } from '@utils';
import type { AppPropsWithLayout } from '@types';
import { createStore } from '@store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { SnackbarProvider } from 'notistack';
import { ConfigProvider } from '@context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../@next/styles/react-date-range.scss';
import '../@next/styles/circle-animation.scss';
import '../@next/styles/loading-animation.scss';

const store = createStore;
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <React.Fragment>
      <Head>
        <title>Identity Gram</title>
      </Head>
      <Provider {...{ store }}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider>
              <ThemeCustomization>
                <SnackbarProvider
                  maxSnack={1}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  autoHideDuration={2000}
                >
                  <AuthWrapper>
                    {getLayout(<Component {...pageProps} />)}
                  </AuthWrapper>
                </SnackbarProvider>
              </ThemeCustomization>
            </ConfigProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}
export default MyApp;

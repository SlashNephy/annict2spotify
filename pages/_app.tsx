import type { AppProps } from 'next/app'
import Head from 'next/head'

import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'

const queryClient = new QueryClient()

// noinspection HtmlRequiredTitleElement
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>

    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          <NotificationsProvider position="top-right">
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  </>
)

export default MyApp

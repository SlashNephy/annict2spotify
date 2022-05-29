import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useMemorableColorScheme } from '../lib/hooks/useMemorableColorScheme'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()

  // noinspection HtmlRequiredTitleElement
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme,
              }}
            >
              <NotificationsProvider position="top-right" autoClose={7000}>
                <Component {...pageProps} />
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}

// noinspection JSUnusedGlobalSymbols
export default MyApp

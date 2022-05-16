import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { MantineProvider } from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

// noinspection HtmlRequiredTitleElement
const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>

    <RecoilRoot>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: (input, init) => fetch(input, init).then((response) => response.json()),
          }}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </SWRConfig>
      </SessionProvider>
    </RecoilRoot>
  </>
)

export default MyApp

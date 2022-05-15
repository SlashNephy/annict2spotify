import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: (input, init) => fetch(input, init).then((response) => response.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </RecoilRoot>
  )
}

export default MyApp

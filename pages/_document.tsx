import Document, { Html, Head, Main, NextScript } from 'next/document'

import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

// noinspection HtmlRequiredTitleElement
class MyDocument extends Document {
  static getInitialProps = getInitialProps

  render = () => (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

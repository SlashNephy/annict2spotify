import { createGetInitialProps } from '@mantine/next'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

class MyDocument extends Document {
  static getInitialProps = getInitialProps

  // noinspection HtmlRequiredTitleElement
  render = () => (
    <Html lang="en">
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

// noinspection JSUnusedGlobalSymbols
export default MyDocument

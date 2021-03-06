import { createGetInitialProps } from '@mantine/next'
import Document, { Html, Head, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

class MyDocument extends Document {
  public static getInitialProps = getInitialProps

  // noinspection HtmlRequiredTitleElement
  public render = () => (
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

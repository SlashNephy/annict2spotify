import Document, { Html, Head, Main, NextScript } from 'next/document'

// noinspection HtmlRequiredTitleElement
class MyDocument extends Document {
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

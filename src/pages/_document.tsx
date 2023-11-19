import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link href="/static/cc-assets/css/global.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&amp;subset=vietnamese"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document

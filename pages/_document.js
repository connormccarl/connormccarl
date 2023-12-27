import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="Connor McCarl's Real Estate Blog" />
        <meta name="author" content="Connor S. McCarl" />
        <link rel="icon" href="@/public/favicon.ico" />

        <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <div id="overlay" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
